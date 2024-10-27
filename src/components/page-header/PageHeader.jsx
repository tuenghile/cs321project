function PageHeader (props) {
    return(
        <header>
            <h1>{props.websiteName}</h1>
            <h2>{props.pageName}</h2>
        </header>
    );
}

export default PageHeader