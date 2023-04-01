import { useRouter } from 'next/router'
import { api } from '@server/api/api'
import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

let renderCount = 0

const Yttgen: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const [generatedTitle, setGeneratedTitle] = useState('')
  const saveTitle = api.youtube.saveTitle.useMutation()
  const generateTitle = api.youtube.generateTitle.useMutation({
    onSuccess: (title, prompt) => {
      if (!title) return

      saveTitle.mutate({ prompt: prompt.trim(), title: title.trim() })
      setGeneratedTitle(title)
    }
  })
  const {
    register,
    formState: { errors },
    watch,
    getValues: getFormValues
  } = useForm({
    defaultValues: {
      description: ''
    }
  })

  const onGenerateTitleClicked = () => {
    const { description } = getFormValues()
    generateTitle.mutate(description)
  }

  React.useEffect(() => {
    renderCount++
  }, [watch])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl uppercase text-white">Yttgen app</h1>
      {/* <pre className="text-white">
        {JSON.stringify({ renderCount, errors }, null, 2)}
      </pre> */}
      <p className="text-center text-2xl text-slate-50">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      {session?.user.email !== 'williamrshepherd@gmail.com' ? undefined : (
        <div className="">
          <form className="flex flex-col gap-4">
            <textarea
              className="text-slate-900"
              {...register('description', { required: true })}
            />
            {errors.description && <p>A prompt must be specified.</p>}

            <button
              type="button"
              onClick={() => void onGenerateTitleClicked()}
              className="border border-blue-600 px-10 py-3 font-semibold text-white no-underline transition hover:border-yellow-300"
            >
              Generate Title
            </button>
          </form>
          <pre className="text-white">
            {generatedTitle && <p>{generatedTitle}</p>}
          </pre>
        </div>
      )}

      <button
        className="border border-white px-10 py-3 font-semibold text-white no-underline transition hover:text-yellow-300"
        onClick={() => void router.replace('/logout')}
      >
        Logout
      </button>
    </div>
  )
}

export default Yttgen
