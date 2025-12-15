import { Twitter, Github, Linkedin, Youtube } from 'lucide-react'

export default function SocialIcons() {
  return (
    <div className="flex gap-4">
      <a
        href="https://x.com/gianthuho"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
        aria-label="Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href="https://github.com/hotrangianthu"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github size={20} />
      </a>
      <a
        href="https://www.linkedin.com/in/hotrangianthu/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      {/* <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-white transition-colors"
        aria-label="YouTube"
      >
        <Youtube size={20} />
      </a> */}
    </div>
  )
}

