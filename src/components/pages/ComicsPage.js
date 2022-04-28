import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";

import AppBanner from '../appBanner/AppBanner'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList"

const ComicsPage = ({ observerRef }) => {
	return (
		<>
			<AppBanner />
			<ErrorBoundary>
				<ComicsList observerRef={observerRef} />
			</ErrorBoundary>
			<Outlet />
		</>
	)
}

export default ComicsPage;