import Link from 'next/link'
import contentData from '../data/content.json'

export default function Home() {
  return (
    <div>
      <section className="header-section">
        <div className="logo-container">
          <h1 className="minecraft-title">CrafTea</h1>
        </div>
        <p className="header-info">
          We are a dedicated team creating high-quality Minecraft Datapacks, Maps, and Resourcepacks.
          Discover our latest projects below and enhance your vanilla experience.
        </p>
        <a
          href="https://discord.com/invite/MBwsTwQktj"
          target="_blank"
          rel="noopener noreferrer"
          className="mc-btn mc-btn-discord"
        >
          Join our Discord
        </a>
      </section>

      <section className="container">
        <h2 className="text-center">Our Content</h2>

        <div className="card-grid">
          {contentData.map((item) => (
            <Link href={`/${item.slug}`} key={item.slug} className="mc-card">
              <div className="card-img-wrapper">
                <img src={item.coverImage} alt={item.name} />
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>{item.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
