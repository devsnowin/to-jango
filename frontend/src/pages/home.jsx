import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import api from "../api";
import Spinner from '../components/spinner'


export default function HomePage() {
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        getNotes()
    }, []);

    async function getNotes() {
        try {
            const res = await api.get("/api/notes/")
            setNotes(res.data)
        } catch (error) {
            console.error(error);
        }
    };

    async function deleteNote(id) {
        try {
            await api.delete(`/api/notes/delete/${id}/`)
            setNotes(prev => prev.filter(note => note.id !== id))
        } catch (error) {
            console.error(error);
        }
    };
    
    return(
        <main className="w-full max-w-xl mx-auto min-h-screen flex flex-col items-center pt-20 space-y-20">
            <NoteForm setNotes={setNotes} />
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-left font-bold text-2xl">Notes</h1>
                    <Link to="/logout">Logout</Link>
                </div>
            {notes.map((note, idx) => (
                <div key={`${idx}-${note.title}-${note.id}`} className="flex items-start justify-between border-b border-zinc-800">
                    <div>
                        <h4 className="font-bold">{note.title}</h4>
                        <p className="max-w-[14rem]">{note.content}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <button className="text-red-600" onClick={() => deleteNote(note.id)}>Delete</button>
                        <time>{new Date(note.created_at).toDateString()}</time>
                    </div>
                </div>
            ))}
            </div>
        </main>
    )
}

function NoteForm({setNotes}) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        setLoading(true)
        
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = {
            title: formData.get("title"),
            content: formData.get("content")
        }
        try {
            const res = await api.post('/api/notes/', data);
            setNotes(prev => [res.data, ...prev])
        } catch (error) {
            console.log(error)
        }
        
        form.reset()
        setLoading(false)
    }
    
    return(
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="title">Title</label>
                <input type="text" name="title" className="border border-zinc-800 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="content">Content</label>
                <textarea name="content" className="border border-zinc-800 rounded-md p-2" />
            </div>
            
            <div className="w-full">
                <button className="w-full capitalize grid place-items-center font-medium bg-zinc-800 text-white px-4 py-2 rounded-md" disabled={loading}>
                    {loading ? <Spinner /> : "Save"}
                </button>
            </div>
        </form>
    )
}