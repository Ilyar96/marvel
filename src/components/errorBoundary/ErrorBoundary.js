import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
	state = {
		error: false
	}

	//! Можно юзать вместо componentDidCatch, но он только меняет state, не получится записать логи...
	// static getDerivedStateFromError(error) {
	// 	return { error: true }
	// }

	componentDidCatch(err, errorInfo) {
		console.log(err, errorInfo);

		this.setState({ error: true });
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage />
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
