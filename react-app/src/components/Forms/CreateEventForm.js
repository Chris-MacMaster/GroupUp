import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"


import "./CreateGroupForm.css"
import "./CreateEventForm.css"
import { joinEvent, makeEvent } from '../../store/event';

export default function CreateEventForm() {
    const history = useHistory();
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const eventState = useSelector(state => state.events.singleEvent)
    const host = user?.username

    const { groupId } = useParams()


    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [group_limit, setGroupLimit] = useState("")
    const [num_going, setNumGoing] = useState("")
    const [format, setFormat] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [strangers, setStrangers] = useState('false')
    const [online, setOnline] = useState('false')
    
    //validation
    const [errors, setErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let e = {}
        setErrors(e)
        if (!name) e.name = "Must submit a name"
        if (name.length > 50) e.nameLength = "Name cannot be greater than 50 characters"
        if (!details) e.details = "Must submit details"
        if (!format) e.format = "Must submit a format"
        if (!description) e.description = "Must submit a description"

        if (!date) e.date = "Must submit a date"
        if (date.length !== 10) e.dateLength = "Date must be written in following format, 'mm/dd/yyyy'"
        if (!futureDateCheck(date)) e.dateFuture = "Date must be set in the future."
    }, [name, details, format, description, strangers, date])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) {
            return
        }
        console.log("NUM GOING", num_going)
        
        const newEvent = {
            name,
            details,
            // 88888 is recorded and used as code for blank if user leaves field blank
            // 0 is still recorded as 0
            num_going: num_going || num_going === 0 ? num_going : 88888,
            group_limit: group_limit || group_limit === 0 ? group_limit : 88888,
            host,
            format,
            description,
            date,
            strangers: strangers === 'true' ? 'true' : 'false',
            online: online === 'true' ? 'true' : 'false',
            saved: 'false',
            group_id: parseInt(groupId),
        }
        console.log("NEW EVENT", newEvent)
        const eventResponse = dispatch(makeEvent(newEvent))
        const eventData = await Promise.resolve(eventResponse)
        console.log("EVENT DATA", eventData)
        if (eventData) {
            dispatch(joinEvent(eventData.id))
            history.push(`/`)
        }

    };


    const handleCheckStrangers = (e) => {
        e.preventDefault()
        e.stopPropagation()
        strangers === 'true' ? setStrangers('false') : setStrangers('true')
    }

    const handleCheckOnline = (e) => {
        e.preventDefault()
        e.stopPropagation()
        online === 'true' ? setOnline('false') : setOnline('true')
    }


    return (
        <div className='cp-container'>
            <div className='g-detail-top-background'>
                "
            </div>
            <h1 className='cp-title form-title'></h1>
            <form className='sp-form' onSubmit={handleSubmit} >

                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Name
                        </label>
                        <p className='create-shop-grey'>
                            Choose a name for your event
                        </p>
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='product-input input-field' type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Title' />
                            {hasSubmitted && errors.name && (
                                <div className='error'>
                                    * {errors.name}
                                </div>
                            )}
                            {hasSubmitted && errors.nameLength && (
                                <div className='error'>
                                    * {errors.nameLength}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Description
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Start with a brief overview of your event. Feel free to mention details such as membership requirements or ground rules!
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='' />
                        {hasSubmitted && errors.description && (
                            <div className='error'>
                                * {errors.description}
                            </div>
                        )}
                    </div>
                </div>

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Details
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Describe your event in detail. This is your chance to be as descriptive as neccessary.
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder='' />
                        {hasSubmitted && errors.details && (
                            <div className='error'>
                                * {errors.details}
                            </div>
                        )}
                    </div>
                </div>

                <div className='product-description-div'>
                    <div className='description-title-sub-text'>
                        <label className='cp-form-label cp-description q-text' >
                            Format
                        </label>
                        <p className='cp-grey-text sub-q-text create-shop-grey'>
                            Describe the format of the event.
                        </p>
                    </div>
                    <div className='cp-field-div description-text'>
                        <textarea className='product-input input-field description-input' type="text-area"
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            placeholder='' />
                        {hasSubmitted && errors.format && (
                            <div className='error'>
                                * {errors.format}
                            </div>
                        )}
                    </div>
                </div>

                <div className='product-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Number of Members
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please enter how many members have indicated they will attend the event so far, including yourself. If you don't know how many exactly, feel free to provide an estimate or leave the input blank.
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='product-input input-field' type="number"
                            value={num_going}
                            onChange={(e) => setNumGoing(e.target.value)}
                            placeholder='Number of attendees' />
                    </div>  
                </div>


                <div className='product-price-div'>
                    <div >
                        <label className='cp-form-label cp-price q-text' >
                            Group Limit
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey'>
                            Please enter the maximum number of attendees allowed at the event. If you don't know or have no limit, feel free to leave the input blank.
                        </p>
                    </div>
                    <div className='cp-form-field'>
                        <input className='product-input input-field' type="number"
                            value={group_limit}
                            onChange={(e) => setGroupLimit(e.target.value)}
                            placeholder='Number of attendees' />
                    </div>
                </div>


                <div className='product-name-div'>
                    <div>
                        <label className='cp-form-label cp-title q-text' >
                            Date
                        </label>
                        <p className='create-shop-grey'>
                            Choose a date for your event
                        </p>
                    </div>
                    <div className='input-div'>
                        <div className='cp-field-div'>
                            <input className='product-input input-field' type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder='mm/dd/yyyy' />
                            {hasSubmitted && errors.date && (
                                <div className='error'>
                                    * {errors.date}
                                </div>
                            )}
                            {hasSubmitted && errors.dateLength && (
                                <div className='error'>
                                    * {errors.dateLength}
                                </div>
                            )}
                            {hasSubmitted && errors.dateFuture && (
                                <div className='error'>
                                    * {errors.dateFuture}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                    <div className='product-shipping-div'>
                        <div className='public-q-div'>
                            <label className='product-label q-text' >
                                Public
                            </label>
                            <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                                Check the box to indicate whether or not your event is open to anyone or just group members.
                            </p>
                        </div>
                        <div className='input-div '>
                        <button onClick={handleCheckStrangers} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Public</button>
                        {strangers === 'true' && 
                        <i className="fas fa-check" />
                        }
                        </div>                    
                    </div>
                <div className='product-shipping-div'>
                    <div className='online-div'>
                        <label className='product-label q-text' >
                            Online
                        </label>
                        <p className='cp-form-label sub-q-text create-shop-grey check-box-text'>
                            Check the box to indicate whether or not your event is online or in person.
                        </p>
                        <div className='input-div '>
                            <button onClick={handleCheckOnline} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button delete-group-button' type='button' >Online</button>
                            {online === 'true' &&
                                <i className="fas fa-check" />
                            }
                        </div>        

                    </div>
                </div>


            </form>
            <input onClick={handleSubmit} className='submit-button form-create-button favorite-shop submit-create-shop create-product-button' type="submit" value="Schedule event" />
        </div>
    );
}


export const urlCheck = (url) => {
    return url.endsWith("jpeg") ||
        url.endsWith("jpg") ||
        url.endsWith("svg") ||
        url.endsWith("png") ||
        url.endsWith('gif') ||
        url.endsWith("bmp")
}

export const futureDateCheck = (str) => {
    let currentDate = new Date()
    let strDate = new Date(str)
    return strDate > currentDate
}


