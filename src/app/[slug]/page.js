import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { promises as fs } from 'fs'
import path from 'path'
import contentData from '../../data/content.json'

// This function tells Next.js which dynamic pages to pre-render at build time
export async function generateStaticParams() {
  return contentData.map((item) => ({
    slug: item.slug,
  }))
}

export default async function ContentPage({ params }) {
  // Await params to be compatible with Next.js 15 API
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const contentItem = contentData.find((item) => item.slug === slug);

  if (!contentItem) {
    notFound();
  }

  let finalMarkdown = contentItem.longDescription || '';
  if (contentItem.markdownFile) {
    try {
      const filePath = path.join(process.cwd(), 'public', contentItem.markdownFile);
      finalMarkdown = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error('Error reading markdown file:', error);
      finalMarkdown = 'Error loading content...';
    }
  }

  return (
    <div className="container">
      <div className="back-btn-wrapper">
        <Link href="/" className="mc-btn mc-btn-secondary">
          &laquo; Back to Home
        </Link>
      </div>

      <div className="detail-layout">
        {/* Left AdSense Placeholder */}
        <div className="adsense-placeholder">
          AdSense Left (Vertical)
        </div>

        {/* Center Content Component */}
        <div className="center-column">
          <div className="detail-content">
          <header className="detail-header">
            <h1 className="minecraft-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              {contentItem.name}
            </h1>
            <img 
              src={contentItem.coverImage} 
              alt={contentItem.name} 
              className="detail-cover"
            />
          </header>

          <div className="markdown-body">
            <ReactMarkdown>
              {finalMarkdown}
            </ReactMarkdown>
          </div>

          <div className="download-section">
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href={contentItem.downloadUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mc-btn"
                style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}
              >
                Download {contentItem.name}
              </a>
              
              {contentItem.resourcePackUrl && (
                <a 
                  href={contentItem.resourcePackUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mc-btn mc-btn-secondary"
                  style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}
                >
                  Download Resource Pack
                </a>
              )}
            </div>
            <p style={{ marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
              By downloading, you agree to our terms of service.
            </p>
          </div>
          </div>

          {/* Bottom ITitan Ad */}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="https://ititanhosting.com/game/minecraft" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <img 
                src="/ititan.png" 
                alt="iTitan Hosting Minecraft Server" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  border: '4px solid #444', 
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' 
                }} 
              />
            </a>
          </div>
        </div>

        {/* Right AdSense Placeholder */}
        <div className="adsense-placeholder">
          AdSense Right (Vertical)
        </div>
      </div>
    </div>
  )
}
