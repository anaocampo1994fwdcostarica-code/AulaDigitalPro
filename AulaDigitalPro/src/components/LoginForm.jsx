export default function LoginForm() {
  return (
    <form>
      <h2>Iniciar sesión</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="tu@email.com" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" placeholder="••••••••" />
      </div>
      <button type="submit">Entrar</button>
    </form>
  )
}