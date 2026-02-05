export default function Maintenance() {
  return (
    <div style={{ 
      position: 'fixed', // Se fija a la pantalla
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: 'white', // Cubre lo que hay detrás
      zIndex: 9999, // Se asegura de estar encima de Nav y Footer
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      fontFamily: 'sans-serif' 
    }}>
      <img src="/logo.png" alt="SOCIEMA" style={{ width: '150px', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '2.5rem', color: '#1a365d', fontWeight: 'bold' }}>SOCIEMA.ORG</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '80%' }}>
        Estamos trabajando en el nuevo sitio web.
      </p>
      <div style={{ 
        marginTop: '30px', 
        padding: '12px 24px', 
        background: '#f0f4f8', 
        borderRadius: '50px', 
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1a365d',
        border: '1px solid #cbd5e0'
      }}>
        🚧 Lanzamiento Próximamente
      </div>
    </div>
  )
}