import { useState, useRef } from "react";

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
		</>
	)
}

export default ComicsPage;