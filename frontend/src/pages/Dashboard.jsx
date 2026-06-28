export default function Dashboard(){

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return(
        <div className="container mt-5">

            <div className="card">

                <div className="card-body">

                    <h1>
                        Dashboard
                    </h1>

                    <hr/>

                    <h4>
                        Dobrodošel,
                        {" "}
                        {user.ime}
                    </h4>

                    <p>
                        Izberi modul iz zgornjega menija.
                    </p>

                </div>

            </div>

        </div>
    );

}