import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import { CustomTextField, CustomNumField } from './CustomFields';
import axios from 'axios';
import { mongooseConnect } from '@/lib/mongoose';
import { Course } from '@/models/Course';


export default function TutorForm({
    _id,
    firstName: existingFirstName,
    lastName: existingLastName,
    email: existingEmail,
    phone: existingPhone,
    costPerHour: existingCostPerHour,
    courses: existingCourses

}) {
    const [firstName, setFirstName] = useState(existingFirstName || '');
    const [lastName, setLastName] = useState(existingLastName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [phone, setPhone] = useState(existingPhone || '');
    const [costPerHour, setCostPerHour] = useState(existingCostPerHour || '');
    const [courses, setCourses] = useState(existingCourses || [])
    const [availableCourses, setAvailableCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let counter = 0
    function Count () {
        return counter++
    }
    console.log(availableCourses)


     useEffect(() => {
         setIsLoading(true);
         axios
             .get('/api/courses')
            .then((response) => setAvailableCourses(response.data), setIsLoading(false));
    }, []);

    const router = useRouter();

    async function saveProduct(event) {
        event.preventDefault();
        const data = {
            firstName,
            lastName,
            email,
            phone,
            costPerHour,
            courses
        };
        if (_id) {
            await axios.put('/api/tutors', { ...data, _id });
        } else {
            await axios.post('/api/tutors', data);
        }
        router.push('/tutors');
    }

    const preventFormSubmission = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the form from submitting when Enter is pressed
        }
    };

    const findCourseTitle = (id) => {
        const lookedCourse = availableCourses.find((element) => element._id === id)
        const title = lookedCourse?.title
        return title
    }


    const handleDeleteItem = (index) => {
        event.preventDefault();
        const newArray = [...courses];
        newArray.splice(index, 1);
        setCourses(newArray);
    };

    const handleChange = (e) => {
        if (courses.includes(e.target.value)) {return console.log("Item already exist")}
        setCourses([...courses,e.target.value]);
      };
    

    return (
        <form
            onSubmit={saveProduct}
            onKeyPress={preventFormSubmission}
            className="flex flex-col"
        >
            <label>Nombre</label>
            <CustomTextField value={firstName} setValue={setFirstName} />

            <label>Apellido</label>
            <CustomTextField value={lastName} setValue={setLastName} />

            <label>Email</label>
            <CustomTextField value={email} setValue={setEmail} />

            <label>Telefono</label>
            <CustomTextField value={phone} setValue={setPhone} />

            <label>Costo por hora</label>
            <CustomNumField value={costPerHour} setValue={setCostPerHour}></CustomNumField>

            <InputLabel id="courses">Cursos</InputLabel>
            <Select labelId='courses' value={""} label="Cursos" onChange={handleChange}>
                {availableCourses?.map((course) => <MenuItem value={course._id} key={course._id}>{course.title}</MenuItem>)}
            </Select>
            <div>
                <h1>Cursos</h1>
                <ul>
                    {courses.map((course, index) => (
                        <li key={index}>
                            {findCourseTitle(course)}
                            <button onClick={() => handleDeleteItem(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Button variant="contained" size="small" type="submit">
                Guardar
            </Button>
        </form>
    );
}


  