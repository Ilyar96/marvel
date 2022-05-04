import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import AppBanner from '../appBanner/AppBanner'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"

const ComicsPage = ({ observerRef }) => {
	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Page with list of our comics" />
				<title>Comics page</title>
			</Helmet>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList observerRef={observerRef} />
			</ErrorBoundary>
			<Outlet />
		</>
	)
}

export default ComicsPage;