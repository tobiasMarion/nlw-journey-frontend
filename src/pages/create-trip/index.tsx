import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestsModealOpen, setIsGuestsModealOpen] = useState(false)
  const [isConfirmTripModealOpen, setIsConfirmTripModealOpen] = useState(false)


  const [emailsToInvite, setEmailToInvite] = useState([
    'tobias.marion@gmail.com'
  ])

  function openGuestsInput() {
    setIsGuestInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModealOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModealOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModealOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModealOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    navigate('/trips/123')
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove)

    setEmailToInvite(newEmailList)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-screen-md w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestsInputOpen={isGuestsInputOpen}
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openGuestsModal={openGuestsModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem com pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade.</a>
        </p>
      </div>

      {isGuestsModealOpen && (
        <InviteGuestsModal
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          addNewEmailToInvite={addNewEmailToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModealOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
        />
      )}

    </div>
  )
}