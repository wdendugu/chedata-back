import { useRouter } from 'next/router';
import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import axios from 'axios';
import { Button, TextField, TextareaAutosize } from '@mui/material';

export default function CourseForm({
    title: existingTitle,
    description: existingDescription,
    priceAr: existingPriceAr,
    priceEx: existingPriceEx,
    _id,
    images: existingImages,
    duration: assignedDuration,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [duration, setDuration] = useState(assignedDuration || '');
    const [priceAr, setPriceAr] = useState(existingPriceAr || '');
    const [priceEx, setPriceEx] = useState(existingPriceEx || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToCourses, setGoToCourses] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

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
        };
        if (_id) {
            await axios.put('/api/courses', { ...data, _id });
        } else {
            await axios.post('/api/courses', data);
        }
        setGoToCourses(true);
    }

    if (goToCourses) {
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

    return (
        <form onSubmit={saveProduct} className="flex flex-col">
            <label>Nombre del Curso</label>
            <TextField
                type="text"
                placeholder="nombre del curso"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="outlined"
                size="small"
            />
            <label>Duracion</label>
            <TextField
                type="text"
                placeholder="duracion del curso"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                variant="outlined"
                size="small"
            />
            <label>Imagen</label>
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
                                <img src={link} alt="" className="rounded-lg" />
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
                    <div>Subir</div>
                    <input
                        type="file"
                        className="hidden"
                        onChange={uploadImages}
                    />
                </label>
            </div>
            <label>Descripcion</label>
            <TextareaAutosize
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
            />
            <label>Precio</label>
            <TextField
                type="number"
                placeholder="precio"
                value={priceAr}
                onChange={(e) => setPriceAr(e.target.value)}
                variant="outlined"
                size="small"
            />
            <label>Precio Exterior</label>
            <TextField
                type="number"
                placeholder="precio"
                value={priceEx}
                onChange={(e) => setPriceEx(e.target.value)}
                variant="outlined"
                size="small"
            />
            <Button variant="contained" size="small" type="submit">
                Guardar
            </Button>
        </form>
    );
}
