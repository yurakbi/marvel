import {Helmet} from "react-helmet";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (
        <>  
            <Helmet>
                <meta
                    name="description"
                    content="Comics book page"
                    />
                <title>Comics book page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;