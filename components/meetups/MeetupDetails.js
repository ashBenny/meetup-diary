
import detailsStyles from './MeetupDetails.module.css';

const MeetupDetails = (props) => {


    return (
        <>
        <section className={detailsStyles.details}>
            <img src = {props.image} className={detailsStyles.detailsImg}/>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <address>{props.address}</address>
        </section>
        
        </>
    )
}

export default MeetupDetails
