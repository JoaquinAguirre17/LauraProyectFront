import CardsComponent from "../CardsComponents/CardsComponent"
import CarruselComponent from "../CarruselComponent/CarruselComponent"
import EsmaltadoSemi from '../../../public/img/EsmaltadoSemi.jpg'
import capping from '../../../public/img/Capping.jpg'
import SoftGel from '../../../public/img/SoftGel.jpg'
import NailArt from '../../../public/img/NailArt.jpg'

import './HomeComponent.css'
function HomeComponent() {
    return (
        <>
            
            <h3>Mis Servicios</h3>
            <div className="Cards">
                <CardsComponent titulo={'Esmaltado Semipermanete'} img={EsmaltadoSemi}
                    descrip={'Es un tipo de manicura que se hace cada 2-3 semanas; a diferencia de los esmaltes clásicos, la manicura semipermanente no requiere que se retire y se vuelva a poner de nuevo con tanta frecuencia, todo es gracias a su durabilidad.'} />

                <CardsComponent titulo={'Capping'} img={capping}
                    descrip={'Técnica de manicuría que consiste en aplicar una fina capa de acrílico o gel fortificador sobre la uña que actúa como una barrera protectora. Este baño en gel kapping no alarga la uña natural sino que acompaña el crecimiento de la misma.'} />

                <CardsComponent titulo={'Soft Gel'} img={SoftGel}
                    descrip={'  Nueva técnica que consiste en un método de extensión de uñas mediante tips que se adhieren directamente a la superficie de la uña natural. Los tips están hechos de plástico flexible y se han ganado su popularidad por tratarse de una técnica rápida, cómoda y efectiva.'} />

                <CardsComponent titulo={'Diseños Extras'} img={NailArt}
                    descrip={'Nail Art (o arte de uñas) es una forma creativa de esmaltar, decorar y embellecer las uñas. El abanico de ideas que forma esta tendencia es muy amplio, ya que no solo se juega con los colores, sino también las formas, los estampados, los materiales y mucho más... '} />

            </div>

            <h3>Mis trabajos</h3>

            <CarruselComponent />

        </>
    )
}
export default HomeComponent