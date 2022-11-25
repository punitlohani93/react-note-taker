import "bootstrap/dist/css/bootstrap.min.css"
import { useMemo, useState } from 'react'
import { Container } from "react-bootstrap"
import { Navigate, Route, Routes } from "react-router-dom"
import { v4 as uuidV4 } from 'uuid'
import { EditNote } from "./components/EditNote"
import { NewNote } from "./components/NewNote"
import { Note } from "./components/Note"
import { NoteLayout } from "./components/NoteLayout"
import { NoteList } from "./components/NoteList"
import { useLocalStorage } from "./hooks/useLocalStorage"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title:string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  const createNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<NoteList availableTags={tags} notes={notesWithTags} />}/>
        <Route path="/new" element={<NewNote onSubmit={createNote} onAddTag={onAddTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note />} />
          <Route path="edit" element={<EditNote onSubmit={updateNote} onAddTag={onAddTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
