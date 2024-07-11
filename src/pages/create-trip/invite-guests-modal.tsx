import { AtSign, Plus, X } from 'lucide-react';
import { FormEvent } from 'react';
import { Button } from '../../components/button';

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal({
  emailsToInvite,
  closeGuestsModal,
  addNewEmailToInvite,
  removeEmailFromInvites
}: InviteGuestsModalProps) {
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-full max-w-screen-sm mx-6 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={closeGuestsModal}><X className="size-5 text-zinc-400" /></button>
          </div>
          <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </header>

        <ul className="flex flex-wrap gap-2">
          {emailsToInvite.map(email => (
            <li key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>
              <button onClick={() => removeEmailFromInvites(email)} type="button"><X className="size-4 text-zinc-400" /></button>
            </li>
          ))}
        </ul>

        <div className="w-full h-px bg-zinc-800"></div>

        <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <div className='px-2 flex items-center gap-2 flex-1'>
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o email do convidado?"
              className="bg-transparent placeholder-zinc-400 outline-none flex-1" />
          </div>

          <Button>
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}