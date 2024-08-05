
import './NavarComponent.css';
import BotonComponent from '../BotonComponent/BontonComponent';
import Logo from '../../../public/img/Logo.png'

function NavarComponent() {
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} alt="Logo" />
                        <p>Lia Nails Manicure</p>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <BotonComponent ruta={'/'} nombre={'HOME'} />
                            </li>
                            <li className="nav-item">
                                <BotonComponent ruta={'/Contacto'} nombre={'CONTACTO'} />
                            </li>
                            <li className="nav-item">
                                <BotonComponent ruta={'/Turnos'} nombre={'TURNOS'} />
                            </li>
                            <li className="nav-item">
                                <BotonComponent ruta={'/AcercaDeMi'} nombre={'ACERCA DE MI'} />
                            </li>


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavarComponent;
