import { useRouter } from 'next/router'
import { api } from '@server/api/api'
import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Yttgen: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const [generatedTitle, setGeneratedTitle] = useState('')
  const saveTitle = api.youtube.saveTitle.useMutation()
  const createTitle = api.youtube.createTitle.useMutation({
    onSuccess: (title, prompt) => {
      if (!title) return

      saveTitle.mutate({ prompt: prompt.trim(), title: title.trim() })
      setGeneratedTitle(title)
    }
  })
  const {
    register,
    formState: { errors },
    getValues: getFormValues
  } = useForm({
    defaultValues: {
      description: ''
    }
  })

  const onTitleCreated = () => {
    const { description } = getFormValues()
    createTitle.mutate(description)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl uppercase text-white">Yttgen app</h1>
      <p className="text-center text-slate-50">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      {session?.user.email !== 'williamrshepherd@gmail.com' ? undefined : (
        <>
          <form className="flex flex-col gap-4">
            <textarea
              className="text-slate-900"
              rows={12}
              {...register('description', { required: true })}
            />
            {errors.description && <p>A prompt must be specified.</p>}

            <button
              type="button"
              onClick={() => void onTitleCreated()}
              className="w-72 border border-blue-600 px-4  py-3 font-semibold text-white no-underline transition hover:border-yellow-300"
            >
              Generate Title
            </button>
          </form>
          <pre className="text-white">
            {generatedTitle && <p>{generatedTitle}</p>}
          </pre>
        </>
      )}

      <button
        className="w-72 border border-white px-4 py-3 font-semibold text-white no-underline transition hover:text-yellow-300"
        onClick={() => void router.replace('/logout')}
      >
        Logout
      </button>
    </div>
  )
}

export default Yttgen
