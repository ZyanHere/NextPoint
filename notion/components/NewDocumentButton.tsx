'use client'


import { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';


function NewDocumentButton() {

  const [isPending, startTransition] = useTransition();//in case of any async behaviour, which is not media, we can wrap it in this hook
  const router = useRouter 

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
    
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
        {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocumentButton
