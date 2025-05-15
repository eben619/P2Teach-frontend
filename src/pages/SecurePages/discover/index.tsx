import { useQuery } from "@tanstack/react-query";
import useAppStore from "../../../store/useAppStore";
import { appTheme } from "../../../constant/theme";
import { useModal } from "../../../hooks/useModal";
import BookLectureDrawer from "./modals/BookLectureDrawer";
import DiscoverCourseCard, {
	SessionAttributes,
} from "../../../components/cards/discover-course-card";
import axios from "axios";
import { baseUrl } from "../../../apis";
import SkeletonLoader from "../../../components/loader/skeletonloader";
import SlideShowText from "../../../components/atoms/animated-text";

const DiscoverCourses = () => {
	const { theme } = useAppStore(["theme"]);
	const { openDrawer } = useModal();

	// Fetch sessions
	const {
		data: sessions,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["sessions"],
		queryFn: async () => {
			const response = await axios.get<{
				success: boolean;
				data: SessionAttributes[];
				message: string;
			}>(`${baseUrl}/sessions/all`);

			if (!response.data.success) {
				throw new Error(response.data.message || "Failed to fetch sessions");
			}

			return response.data.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	return (
		<div
			className="p-4 sm:p-6"
			style={{
				backgroundColor: appTheme[theme].surface.secondary,
				color: appTheme.text.primary,
			}}
		>
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold">Discover Courses</h1>
				<SlideShowText theme={theme} />
			</div>

			{/* Search & Filters */}
			{!isLoading && (
				<div className="mb-8 flex flex-col md:flex-row gap-4 w-full">
					<input
						type="text"
						placeholder="Search courses..."
						className="p-3 rounded-lg w-full md:w-auto flex-1"
						style={{
							backgroundColor: appTheme[theme].surface.primary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
					/>
					<select
						className="p-3 rounded-lg w-full md:w-auto"
						style={{
							backgroundColor: appTheme[theme].surface.primary,
							border: `1px solid ${appTheme[theme].neutral[200]}`,
						}}
					>
						<option>All Categories</option>
						<option>Blockchain</option>
						<option>Programming</option>
						<option>Mathematics</option>
					</select>
				</div>
			)}

			{/* Loading */}
			{isLoading && <SkeletonLoader theme={theme} cardCount={6} />}

			{/* Error */}
			{isError && (
				<div
					className="text-center py-8"
					style={{ color: appTheme[theme].status.error }}
				>
					Failed to load courses. Please try again later.
				</div>
			)}

			{/* Success */}
			{!isLoading && !isError && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{sessions?.map((session) => (
						<DiscoverCourseCard
							key={session.id}
							session={session}
							theme={theme}
							onBook={() =>
								openDrawer(<BookLectureDrawer course={session} />, {
									containerStyle: { overflowY: "auto" },
								})
							}
						/>
					))}
				</div>
			)}

			{/* Empty state */}
			{!isLoading && !isError && sessions?.length === 0 && (
				<div className="text-center py-8">
					No courses available at the moment.
				</div>
			)}
		</div>
	);
};

export default DiscoverCourses;
