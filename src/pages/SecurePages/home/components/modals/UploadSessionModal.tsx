import { motion } from "framer-motion";
import useAppStore from "../../../../../store/useAppStore";
import { FiClock, FiBook } from "react-icons/fi";
import { appTheme } from "../../../../../constant/theme";
import { useState, useEffect } from "react";
import { AuthButton } from "../../../../AuthPages/components/auth-button";
import axios from "axios";
import { toast } from "react-toastify";
import useUserStore from "../../../../../store/useUserStore";
import { useWalletStore } from "../../../../../store/useWalletStore";
import { ethers } from "ethers";

// Animation variants
const modalVariants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
			duration: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
	hover: { scale: 1.02 },
	tap: { scale: 0.98 },
};

// Contract configuration
const CONTRACT_ADDRESS = "0x9b3525032030b91aa27370f4a6fddb74ceb25936";
const CONTRACT_ABI = [
	{
		"inputs": [
			{ "name": "courseTitle", "type": "string" },
			{ "name": "subject", "type": "string" },
			{ "name": "price", "type": "uint256" },
			{ "name": "durationHours", "type": "uint256" }
		],
		"name": "createSession",
		"outputs": [{ "name": "", "type": "bool" }],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const UploadSessionModal = () => {
	const { theme } = useAppStore(["theme"]);
	const [durationUnit, setDurationUnit] = useState("hours");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const { currentUser } = useUserStore((state) => state);
	const { account } = useWalletStore();
	const [txStatus, setTxStatus] = useState<string>("");
	const [formData, setFormData] = useState({
		title: "",
		subject: "",
		amount: "",
		duration: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTxStatus("");

		if (!account) {
			toast.error("Please connect your wallet to create a session");
			setIsSubmitting(false);
			return;
		}

		// Ensure the inputs are valid
		if (!formData.title || !formData.subject || !formData.amount || !formData.duration) {
			toast.error("Please fill in all required fields");
			setIsSubmitting(false);
			return;
		}

		try {
			// Create session on blockchain
			if (window.ethereum) {
				try {
					setTxStatus("Connecting to blockchain...");
					const provider = new ethers.BrowserProvider(window.ethereum);
					const signer = await provider.getSigner();
					const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

					// Convert price to wei
					const priceInWei = ethers.parseEther(formData.amount);
					
					// Calculate duration in hours
					let durationInHours = parseInt(formData.duration);
					if (durationUnit === "days") {
						durationInHours *= 24;
					} else if (durationUnit === "weeks") {
						durationInHours *= 24 * 7;
					}

					setTxStatus("Submitting transaction...");
					const tx = await contract.createSession(
						formData.title,
						formData.subject,
						priceInWei,
						durationInHours
					);

					setTxStatus("Transaction submitted. Waiting for confirmation...");
					const receipt = await tx.wait();
					
					// If transaction was successful
					if (receipt.status === 1) {
						setTxStatus("Transaction confirmed!");
						
						// Now save to backend as well
						const response = await axios.post("http://localhost:3001/api/sessions/", {
							user_id: currentUser?.id,
							coursetitle: formData.title,
							subjectitle: formData.subject,
							price: formData.amount,
							duration: formData.duration,
							walletaddress: account,
							tx_hash: receipt.transactionHash
						});

						if (response.status === 201) {
							toast.success("Session created successfully on blockchain and backend!");
						}
					} else {
						toast.error("Transaction failed");
					}
				} catch (error) {
					console.error("Blockchain error:", error);
					toast.error(`Blockchain error: ${error instanceof Error ? error.message : "Unknown error"}`);
				}
			} else {
				// Fallback to just API if no wallet is available
				toast.error("MetaMask not detected. Please install MetaMask to create sessions.");
			}
		} catch (error) {
			console.error("Error creating session:", error);
			if (axios.isAxiosError(error)) {
				const errorMessage =
					error.response?.data?.message || "Failed to create session";
				toast.error(errorMessage);
			} else {
				toast.error("An unexpected error occurred");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={modalVariants}
			className="p-6 rounded-lg w-full"
			style={{
				backgroundColor: appTheme[theme].surface.primary,
				color:
					theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
			}}
		>
			<div className="flex justify-center items-center mb-6">
				<motion.h2 className="text-xl font-semibold" variants={itemVariants}>
					Create New Session
				</motion.h2>
			</div>

			{txStatus && (
				<motion.div 
					className={`p-3 mb-4 rounded-md text-sm ${
						txStatus.includes("error") || txStatus.includes("failed") 
							? "bg-red-100 text-red-700" 
							: txStatus.includes("confirmed") || txStatus.includes("success") 
								? "bg-green-100 text-green-700" 
								: "bg-blue-100 text-blue-700"
					}`}
					variants={itemVariants}
				>
					{txStatus}
				</motion.div>
			)}

			<motion.form
				onSubmit={handleSubmit}
				className="space-y-4 sm:space-y-6"
				variants={{
					visible: {
						transition: {
							staggerChildren: 0.1,
						},
					},
				}}
			>
				{/* Course Title */}
				<motion.div variants={itemVariants}>
					<label className="block text-sm font-medium mb-2">
						Course Title *
					</label>
					<div className="relative">
						<FiBook
							size={18}
							className="absolute left-3 top-1/2 -translate-y-1/2"
							style={{ color: appTheme[theme].neutral[400] }}
						/>
						<motion.input
							type="text"
							required
							className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
							}}
							placeholder="Introduction to Computer Science"
							value={formData.title}
							onChange={(e) =>
								setFormData({ ...formData, title: e.target.value })
							}
						/>
					</div>
				</motion.div>

				{/* Subject */}
				<motion.div variants={itemVariants}>
					<label className="block text-sm font-medium mb-2">Subject *</label>
					<div className="relative">
						<motion.input
							type="text"
							required
							className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
							style={{
								backgroundColor: appTheme[theme].surface.secondary,
								border: `1px solid ${appTheme[theme].neutral[200]}`,
							}}
							placeholder="Data Structures & Algorithms"
							value={formData.subject}
							onChange={(e) =>
								setFormData({ ...formData, subject: e.target.value })
							}
						/>
					</div>
				</motion.div>

				{/* Price and Duration */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-4"
					variants={itemVariants}
				>
					{/* Amount */}
					<div>
						<label className="block text-sm font-medium mb-2">Price (ETH) *</label>
						<div className="relative">
							<motion.input
								type="number"
								required
								step="0.000001"
								min="0"
								className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
								style={{
									backgroundColor: appTheme[theme].surface.secondary,
									border: `1px solid ${appTheme[theme].neutral[200]}`,
								}}
								placeholder="0.00"
								value={formData.amount}
								onChange={(e) =>
									setFormData({ ...formData, amount: e.target.value })
								}
							/>
						</div>
					</div>

					{/* Duration */}
					<div>
						<label className="block text-sm font-medium mb-2">Duration *</label>
						<div className="relative">
							<FiClock
								size={18}
								className="absolute left-3 top-1/2 -translate-y-1/2"
								style={{ color: appTheme[theme].neutral[400] }}
							/>
							<div className="flex gap-2">
								<motion.input
									type="number"
									required
									min="1"
									className="w-full pl-10 pr-4 py-3 rounded-lg transition-colors duration-200"
									style={{
										backgroundColor: appTheme[theme].surface.secondary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
									placeholder="6"
									value={formData.duration}
									onChange={(e) =>
										setFormData({ ...formData, duration: e.target.value })
									}
								/>
								<motion.select
									className="rounded-lg px-3 transition-colors duration-200"
									style={{
										backgroundColor: appTheme[theme].surface.secondary,
										border: `1px solid ${appTheme[theme].neutral[200]}`,
									}}
									value={durationUnit}
									onChange={(e) => setDurationUnit(e.target.value)}
								>
									<option value="hours">Hours</option>
									<option value="days">Days</option>
									<option value="weeks">Weeks</option>
								</motion.select>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Wallet status */}
				<motion.div variants={itemVariants}>
					{account ? (
						<div className="p-2 bg-green-100 text-green-800 rounded-md text-sm">
							Connected wallet: {account.substring(0, 6)}...{account.substring(account.length - 4)}
						</div>
					) : (
						<div className="p-2 bg-yellow-100 text-yellow-800 rounded-md text-sm">
							Please connect your wallet to create a session
						</div>
					)}
				</motion.div>

				{/* Action Buttons */}
				<motion.div className="sm:flex flex-col flex-1 gap-4" variants={itemVariants}>
					<motion.div
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						className="flex-1"
					>
						<AuthButton
							isLoading={isSubmitting}
							label={isSubmitting ? "Processing..." : "Create Session"}
							type="submit"
							disabled={!account || isSubmitting}
						/>
					</motion.div>
					<motion.button
						type="button"
						className="flex-1 px-4 py-3 w-full gap-2 rounded-lg font-semibold transition-colors duration-200 hover:brightness-95"
						style={{
							backgroundColor: appTheme[theme].surface.secondary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
						variants={buttonVariants}
						whileHover="hover"
						whileTap="tap"
						onClick={() => {
							setFormData({
								title: "",
								subject: "",
								amount: "",
								duration: "",
							});
							setTxStatus("");
						}}
					>
						Cancel
					</motion.button>
				</motion.div>
			</motion.form>
		</motion.div>
	);
};

export default UploadSessionModal;