import React, { useState, useEffect } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import * as reservationActions from "../../store/reservation"
import { useHistory, useParams } from "react-router-dom";
//import { SelectButton } from 'primereact/selectbutton';
//import Select from 'react-select';
import * as petActions from "../../store/pet";




function BookReservationModal({ walker }) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    //const walkerId = walker.id
    // console.log("WALKER ID------", walkerId)
    //console.log("WHICH WALKER?", walker)
    //it only works when you have url for walkerId
    const sessionUser = useSelector(state => state.session.user);
    //const walkersObj = useSelector(state => state.walkers)
    //const walkers = Object.values(walkersObj)
    //console.log("walkers", walkers)
    const [userId, setUserId] = useState(sessionUser?.id);
    const [walkerId, setWalkerId] = useState(walker?.id);
    const pets = useSelector(state => state.pets);
    const [petsArr, setPetsArr] = useState([]);
    //console.log("PET SHOW ANYTHING???", Object.values(pets))
    //const [pet, setPet] = useState("");
    const [taskType, setTaskType] = useState("Dog Walking");
    const [taskLength, setTaskLength] = useState("30 Minutes");
    const [address, setAddress] = useState("");
    const [comment, setComment] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("6:00AM-9:00AM");
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [petName, setPetName] = useState("");
    const [loaded, setLoaded] = useState(false);
    //const selectRef = React.useRef();


    const updatePet = e => {
        setPetName(e.target.value)
    }


    useEffect(() => {
        if (sessionUser) {
            dispatch(petActions.loadAllPets());
        }
    }, [sessionUser]);


    useEffect(() => {
        let petsObj = { ...pets }
        let array = [];
        Object.keys(petsObj).forEach((key) => {
            let pet = petsObj[key]
            array.push(pet)
        })
        //console.log("PETHERE  ---", pet)
        //console.log("PET IS HERE ------", pet)

        //console.log("CHECKOUT THIS PAT ARRAY???----", array)
        setPetsArr(array)
        setLoaded(true)
    }, [])


    useEffect(() => {
        let errors = [];
        if (!taskType.length) errors.push("Please choose one task type.")
        if (!taskLength.length) errors.push("Please choose the task length.")
        if (!address.length) errors.push("Please enter an address.")
        if (!comment.length) errors.push("Please leave a message for the dog walker.")
        if (!date.length) errors.push("Please enter a date.")
        if (!time.length) errors.push("Please enter a time frame.")
        //if (!petName.length) errors.push("Please choose one pet for this reservstion")

        setErrors(errors)
    }, [taskType, taskLength, address, comment, date, time])



    const submitNewReservation = () => {
        setHasSubmitted(true)
        if (errors.length > 0) return;

        const newReservationData = {};
        setUserId(sessionUser.id)
        setWalkerId(walker.id)
        //console.log("WALKER HERE", walker)
        newReservationData.userId = userId
        newReservationData.walkerId = walkerId
        newReservationData.taskType = taskType
        newReservationData.taskLength = taskLength
        newReservationData.address = address
        newReservationData.comment = comment
        newReservationData.date = date
        newReservationData.time = time
        newReservationData.petName = petName
        console.log("WHAT IS THE PET NAME HERE", petName)

        dispatch(reservationActions.newReservation(newReservationData))
            .then(() => {
                setTaskType("");
                setTaskLength("");
                setAddress("");
                setComment("");
                setDate("");
                setTime("");
                setPetName("")
                setErrors([]);
                setShowModal(false)
                history.push('/reservations')
                // need a .then and redirect IF you add a new trip while on another trip details page
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }


    if (!loaded) return null

    return (

        <>

            <button className="BookReservationButton" onClick={() => setShowModal(true)}>
                Book A Walk with {walker.name} Now!
            </button>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="formContainer3">
                            <h1> Book A Walk </h1>

                            <form className="new-reservation-form" onSubmit={e => {
                                e.preventDefault();
                                submitNewReservation();
                            }}>
                                <ul className="new-reservation-errors">
                                    {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
                                </ul>
                                <div>
                                    {/* <h1>THIS IS WALKER ID: {walker?.id}</h1> */}
                                    <label className='reservationlabel'>
                                        Please Pick A Task Type:
                                    </label>
                                    <select onChange={e => setTaskType(e.target.value)} value={taskType} >
                                        <option value="Dog Walking">
                                            Dog Walking
                                        </option>
                                        <option value="Drop-In Visit">
                                            Drop In Visit
                                        </option>
                                    </select>
                                    <label className='reservationlabel'>
                                        Please Pick Your Task Length:
                                    </label>
                                    <select onChange={e => setTaskLength(e.target.value)} value={taskLength} >
                                        <option value="30 Minutes">
                                            30 Minutes
                                        </option>
                                        <option value="60 Minutes">
                                            60 Minutes
                                        </option>
                                    </select>
                                    <label className='reservationlabel'>
                                        Your Address:
                                    </label>
                                    <input onChange={e => setAddress(e.target.value)} type="text" className="new-task-address" placeholder='Address' value={address} />
                                    <label className='reservationlabel'>
                                        Message for Dog Walker:
                                    </label>
                                    <input onChange={e => setComment(e.target.value)} type="text" className="new-task-comment" placeholder="Comment" value={comment} />
                                    <label className='reservationlabel'>
                                        Please Pick A Date:
                                    </label>
                                    <input onChange={e => setDate(e.target.value)} type="date" className="new-task-date" value={date} />
                                    <label className='reservationlabel'>
                                        Please Pick A Time Frame:
                                    </label>
                                    <select onChange={e => setTime(e.target.value)} value={time} >
                                        <option value="6:00AM-9:00AM">
                                            6:00AM-9:00AM
                                        </option>
                                        <option value="9:00AM-12:00PM">
                                            9:00AM-12:00PM
                                        </option>
                                        <option value="12:00PM-3:00PM">
                                            12:00PM-3:00OM
                                        </option>
                                        <option value="3:00PM-6:00PM">
                                            3:00PM-6:00PM
                                        </option>
                                        <option value="6:00PM-9:00PM">
                                            6:00PM-9:00PM
                                        </option>
                                        <option value="9:00PM-12:00AM">
                                            9:00PM-12:00AM
                                        </option>
                                    </select>
                                    <label className='reservationlabel'>
                                        Pick A Pet:
                                    </label>
                                    <select onChange={updatePet} value={petName} >
                                        {
                                            Object.values(pets)?.map(pet => {
                                                return (
                                                    <option value={pet.name}>{pet.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button id="new-task-submit" type='submit' >Submit</button>
                                </div>
                            </form>
                        </div>
                    </Modal >
                )
            }


        </>
    )

};


export default BookReservationModal;
