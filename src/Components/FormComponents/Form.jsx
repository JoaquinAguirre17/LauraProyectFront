import { useState } from 'react';
import './From.css'

function Form() {
    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
        nombreCliente: '',
        emailCliente: '',
        tipoServicio: '',
        montoSeña: '',
    });

    const servicios = {
        "Capping": 3900,
        "Esmaltado Semipermanente": 3000,
        "Soft Gel": 4400,
    };

    const horariosDisponibles = {
        "Lunes": ["09:00", "11:30", "13:30", "17:30"],
        "Martes": ["09:00", "11:30", "15:00", "18:00"],
        "Miércoles": ["09:00", "11:30", "13:30", "17:30"],
        "Jueves": ["09:00", "11:30", "15:00", "18:00"],
        "Viernes": ["09:00", "11:30", "13:00", "15:00", "18:00"],
        "Sábado": ["10:00", "12:30", "15:00"],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleServicioChange = (servicio) => {
        setFormData({
            ...formData,
            tipoServicio: servicio,
            montoSeña: servicios[servicio]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mensajeWhatsApp = `Reserva de turno:\nNombre: ${formData.nombreCliente}\nEmail: ${formData.emailCliente}\nFecha: ${formData.fecha}\nHora: ${formData.hora}\nServicio: ${formData.tipoServicio}\nMonto de la Seña: $${formData.montoSeña}`;
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=3513430611&text=${encodeURIComponent(mensajeWhatsApp)}`;

        alert('Reserva creada. Serás redirigido a WhatsApp para confirmar.');
        window.location.href = urlWhatsApp; // Redirige a WhatsApp
    };

    return (
        <div className='formulario'>
            <div className="form-container">
                <h2>Reservar Turno</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <select id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required>
                            <option value="">Selecciona un día</option>
                            {Object.keys(horariosDisponibles).map((dia) => (
                                <option key={dia} value={dia}>{dia}</option>
                            ))}
                        </select>
                    </div>
                    {formData.fecha && (
                        <div className="form-group">
                            <label htmlFor="hora">Hora:</label>
                            <select id="hora" name="hora" value={formData.hora} onChange={handleChange} required>
                                <option value="">Selecciona una hora</option>
                                {horariosDisponibles[formData.fecha].map((hora) => (
                                    <option key={hora} value={hora}>{hora}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label htmlFor="nombreCliente">Nombre:</label>
                        <input type="text" id="nombreCliente" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="emailCliente">Email:</label>
                        <input type="text" id="emailCliente" name="emailCliente" value={formData.emailCliente} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Tipo de Servicio:</label>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formData.tipoServicio || "Selecciona un servicio"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {Object.keys(servicios).map((servicio) => (
                                    <li key={servicio} onClick={() => handleServicioChange(servicio)} className="dropdown-item">
                                        {servicio}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="montoSeña">Monto de la Seña (50%):</label>
                        <input type="number" id="montoSeña" name="montoSeña" value={formData.montoSeña} readOnly />
                    </div>
                    <button type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
