import { useRouter } from 'next/router';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';
import { Button, TextareaAutosize, Checkbox } from '@mui/material';
import { Spinner } from './Spinner';
import { CustomTextField, CustomNumField } from './CustomFields';

export default function CourseForm({
    title: existingTitle,
    description: existingDescription,
    priceAr: existingPriceAr,
    priceEx: existingPriceEx,
    _id,
    images: existingImages,
    duration: existingDuration,
    active: existingActive,
    requirements: existingarrayOfRequirements,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [duration, setDuration] = useState(existingDuration || '');
    const [priceAr, setPriceAr] = useState(existingPriceAr || '');
    const [priceEx, setPriceEx] = useState(existingPriceEx || '');
    const [images, setImages] = useState(existingImages || []);
    const [checked, setChecked] = useState(existingActive || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [requirement, setRequirement] = useState('');
    const [arrayOfRequirements, setArrayOfRequirements] = useState(
        existingarrayOfRequirements || []
    );

    const router = useRouter();

    async function saveProduct(event) {
        event.preventDefault();
        const data = {
            title,
            description,
            priceAr,
            priceEx,
            images,
            duration,
            active: checked,
            requirements: arrayOfRequirements,
        };
        if (_id) {
            await axios.put('/api/courses', { ...data, _id });
        } else {
            await axios.post('/api/courses', data);
        }
        router.push('/courses');
    }

    async function uploadImages(event) {
        const files = event.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages((oldImages) => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    const handleAddToArray = () => {
        if (requirement.trim() !== '') {
            setArrayOfRequirements((prevArray) => [...prevArray, requirement]);
            setRequirement(''); // Clear the input field
        }
    };

    const preventFormSubmission = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the form from submitting when Enter is pressed
        }
    };

    const handleDeleteItem = (index) => {
        event.preventDefault();
        const newArray = [...arrayOfRequirements];
        newArray.splice(index, 1);
        setArrayOfRequirements(newArray);
    };

    return (
        <form
            onSubmit={saveProduct}
            onKeyPress={preventFormSubmission}
            className="flex flex-col"
        >
            <label>Nombre del Curso</label>
            <CustomTextField value={title} setValue={setTitle} />

            <label>Duracion</label>
            <CustomNumField value={duration} setValue={setDuration} />

            <label>Photo</label>
            <div className="mb-2 flex flex-wrap gap-1">
                <ReactSortable
                    list={images}
                    setList={updateImagesOrder}
                    className="flex flex-wrap gap-1"
                >
                    {!!images?.length &&
                        images.map((link) => (
                            <div
                                key={link}
                                className="h-24 bg-white p-4 shadow-sm rounded-sm border boder-gray-200 "
                            >
                                <img
                                    src={link}
                                    alt=""
                                    className="rounded-lg w-full h-full object-cover"
                                />
                            </div>
                        ))}
                </ReactSortable>
                {isUploading && (
                    <div className="h-24 p-2 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 flex text-sm flex-col gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary items-center justify-center cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                    </svg>
                    <div>Upload</div>
                    <input
                        type="file"
                        className="hidden"
                        onChange={uploadImages}
                    />
                </label>
                {!images?.length && <div>No photos</div>}
            </div>

            <label>Descripcion</label>
            <TextareaAutosize
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
            />

            <label>Requisitos</label>
            <CustomTextField value={requirement} setValue={setRequirement} />
            <button type="button" onClick={handleAddToArray}>
                Agregar
            </button>
            <div>
                <h1>Requisitos</h1>
                <ul>
                    {arrayOfRequirements.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button onClick={() => handleDeleteItem(index)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <label>Precio</label>
            <CustomNumField value={priceAr} setValue={setPriceAr} />

            <label>Precio Exterior</label>
            <CustomNumField value={priceEx} setValue={setPriceEx} />

            <label>Activo</label>
            <Checkbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <Button variant="contained" size="small" type="submit">
                Guardar
            </Button>
        </form>
    );
}
