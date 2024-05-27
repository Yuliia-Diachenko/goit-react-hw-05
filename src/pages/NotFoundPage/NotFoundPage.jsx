import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <p>Sorry, page not found! Please go to <Link to="/">Home page</Link>!</p>
    )
}
export default NotFoundPage;