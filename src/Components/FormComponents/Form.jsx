import { useState, useEffect } from 'react';
import axios from 'axios';
import './From.css';

function Form() {
    const [formData, setFormData] = useState({
        fecha: '',
        hora: '',
        nombreCliente: '',
        emailCliente: '',
        tipoServicio: '',
        montoSeña: '',
    });

    const [horariosDisponibles, setHorariosDisponibles] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const servicios = {
        "Capping": 7800,
        "Esmaltado Semipermanente": 6000,
        "Soft Gel": 8800,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleServicioChange = (servicio) => {
        console.log(`Servicio seleccionado: ${servicio}, Monto de la seña: ${servicios[servicio] / 2}`);
        setFormData((prevFormData) => ({
            ...prevFormData,
            tipoServicio: servicio,
            montoSeña: servicios[servicio] / 2,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://lauraproyectback.onrender.com/turnos/reservar', formData);
    
            console.log('Respuesta del servidor:', response.data);
    
            const mensajeWhatsApp = `Reserva de turno:\nNombre: ${formData.nombreCliente}\nEmail: ${formData.emailCliente}\nFecha: ${formData.fecha}\nHora: ${formData.hora}\nServicio: ${formData.tipoServicio}\nMonto de la Seña: $${formData.montoSeña}`;
            const urlWhatsApp = `https://api.whatsapp.com/send?phone=3513430611&text=${encodeURIComponent(mensajeWhatsApp)}`;
    
            alert('Reserva creada. Serás redirigido a WhatsApp para confirmar.');
            window.location.href = urlWhatsApp;
        } catch (error) {
            if (error.response) {
                // La solicitud fue realizada y el servidor respondió con un estado de error
                console.error('Respuesta del servidor con error:', error.response.data);
            } else if (error.request) {
                // La solicitud fue realizada pero no se recibió respuesta
                console.error('No se recibió respuesta del servidor:', error.request);
            } else {
                // Ocurrió un error durante la configuración de la solicitud
                console.error('Error al configurar la solicitud:', error.message);
            }
        }
    };

    useEffect(() => {
        const fetchHorariosDisponibles = async () => {
            if (formData.fecha) {
                const diaSemana = new Date(formData.fecha).getUTCDay();
                console.log("Día de la semana seleccionado:", diaSemana);
                if (diaSemana === 0) {
                    setHorariosDisponibles([]);
                    setMensaje('No se pueden seleccionar turnos los domingos.');
                } else {
                    try {
                        console.log("Fetching horarios disponibles for fecha:", formData.fecha);
                        const response = await axios.get('https://lauraproyectback.onrender.com/turnos/horarios-disponibles', {
                            params: { fecha: formData.fecha }
                        });
                        console.log("Horarios disponibles recibidos del backend:", response.data);
                        setHorariosDisponibles(response.data);
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            hora: ''
                        }));
                        setMensaje('');
                    } catch (error) {
                        console.error('Error al obtener horarios disponibles:', error);
                        setMensaje('Error al obtener horarios disponibles.');
                    }
                }
            }
        };

        fetchHorariosDisponibles();
    }, [formData.fecha]);

    return (
        <div className='formulario'>
            <div className="form-container">
                <h2>Reservar Turno</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} required />
                    </div>
                    {formData.fecha && (
                        <div className="form-group">
                            <label htmlFor="hora">Hora:</label>
                            <select id="hora" name="hora" value={formData.hora} onChange={handleChange} required>
                                <option value="">Selecciona una hora</option>
                                {horariosDisponibles.map((hora) => (
                                    <option key={hora} value={hora}>{hora}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {mensaje && <p className="mensaje">{mensaje}</p>}
                    <div className="form-group">
                        <label htmlFor="nombreCliente">Nombre:</label>
                        <input type="text" id="nombreCliente" name="nombreCliente" value={formData.nombreCliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailCliente">Email:</label>
                        <input type="email" id="emailCliente" name="emailCliente" value={formData.emailCliente} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Servicio:</label>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {formData.tipoServicio || "Selecciona un servicio"}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {Object.keys(servicios).map((servicio) => (
                                    <li key={servicio} className="dropdown-item" onClick={() => handleServicioChange(servicio)}>
                                        {servicio}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="montoSeña">Monto de la Seña (50%):</label>
                        <input type="number" id="montoSeña" name="montoSeña" value={formData.montoSeña} readOnly />
                    </div>
                    <button type="submit" className="btn btn-primary">Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default Form;
