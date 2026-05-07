import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Bienvenue sur votre tableau de bord !</b>
        {' C’est ici que les administrateurs se connectent pour gérer la boutique. Les clients doivent passer par '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>la connexion du site</a>
        {' pour accéder à leur compte, leur historique de commandes et plus encore.'}
      </p>
    </div>
  )
}
