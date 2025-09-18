import { Component, signal, Renderer2, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Technology {
  name: string;
  icon: string;
}

interface Project {
  name: string;
  description: string;
  githubUrl: string;
  images: string[];
  currentImageIndex: number;
  fadingOut: boolean;
  technologies: Technology[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('portafolio');
  isDarkMode = signal(false);
  isMenuOpen = signal(false);

  private intervals: any[] = [];

  projects: Project[] = [
    {
      name: 'LAEW WEB',
      description: 'Aplicación web para la gestión de un gimnasio, permitiendo el registro de clientes, seguimiento de pagos y control de asistencias.',
      githubUrl: 'https://github.com/MathewAviles/laewweb',
      images: [
        'resources/gym/Captura de pantalla 2025-09-18 133954.png',
        'resources/gym/Captura de pantalla 2025-09-18 134007.png',
        'resources/gym/Captura de pantalla 2025-09-18 134019.png',
        'resources/gym/Captura de pantalla 2025-09-18 134028.png',
        'resources/gym/Captura de pantalla 2025-09-18 134039.png',
        'resources/gym/Captura de pantalla 2025-09-18 134048.png'
      ],
      currentImageIndex: 0,
      fadingOut: false,
      technologies: [
        { name: 'TypeScript', icon: 'fab fa-js-square' },
        { name: 'Next.js', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
      ]
    },
    {
      name: 'Huellitas',
      description: 'Plataforma para la gestión de una veterinaria, que incluye registro de mascotas, control de citas, historial clínico y recordatorios de vacunación.',
      githubUrl: 'https://github.com/MathewAviles/HuellitasFinalDeployment',
      images: [
        'resources/huellitas/Captura de pantalla 2025-09-18 162455.png',
        'resources/huellitas/Captura de pantalla 2025-09-18 162505.png',
        'resources/huellitas/Captura de pantalla 2025-09-18 162515.png',
        'resources/huellitas/Captura de pantalla 2025-09-18 162641.png',
        'resources/huellitas/Captura de pantalla 2025-09-18 162718.png',
        'resources/huellitas/Captura de pantalla 2025-09-18 162733.png'
      ],
      currentImageIndex: 0,
      fadingOut: false,
      technologies: [
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Keras', icon: 'fas fa-brain' },
        { name: 'Docker', icon: 'fab fa-docker' },
      ]
    }
  ];

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
    // Initialize theme based on system preference or stored value
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);
    if (prefersDark) {
      this.renderer.addClass(this.document.body, 'dark');
    }
  }

  ngOnInit() {
    this.projects.forEach(project => {
      const interval = setInterval(() => {
        project.fadingOut = true;
        setTimeout(() => {
          project.currentImageIndex = (project.currentImageIndex + 1) % project.images.length;
          project.fadingOut = false;
        }, 500); // Corresponds to the animation duration
      }, 4000);
      this.intervals.push(interval);
    });
  }

  ngOnDestroy() {
    this.intervals.forEach(interval => clearInterval(interval));
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    if (this.isDarkMode()) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  }

  scrollTo(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen.set(false); // Close menu on navigation
  }

  skills = [
    {
      category: 'Lenguajes de Programación',
      color: '#007bff',
      items: [
        { name: 'Java', icon: 'fab fa-java', level: 'Junior' },
        { name: 'C#', icon: 'fab fa-windows', level: 'Junior' },
      ]
    },
    {
      category: 'Bases de Datos',
      color: '#28a745',
      items: [
        { name: 'SQL', icon: 'fas fa-database', level: 'Junior' },
        { name: 'PostgreSQL', icon: 'fas fa-database', level: 'Junior' },
      ]
    },
    {
      category: 'Frameworks y Librerías',
      color: '#ffc107',
      items: [
        { name: 'Spring Boot', icon: 'fab fa-java', level: 'Junior' },
        { name: 'Flask', icon: 'fab fa-python', level: 'Junior' },
        { name: '.NET', icon: 'fab fa-windows', level: 'Junior' },
        { name: 'Angular', icon: 'fab fa-angular', level: 'Junior' },
        { name: 'React', icon: 'fab fa-react', level: 'Junior' },
      ]
    },
    {
      category: 'Herramientas y Control de Versiones',
      color: '#dc3545',
      items: [
        { name: 'Git & GitHub', icon: 'fab fa-git-alt', level: 'Junior' },
        { name: 'Postman', icon: 'fas fa-rocket', level: 'Junior' },
        { name: 'Docker', icon: 'fab fa-docker', level: 'Junior' },
      ]
    },
    {
      category: 'Habilidades blandas',
      color: '#6c757d',
      items: [
        { name: 'Resolución de problemas', icon: 'fas fa-lightbulb', level: undefined },
        { name: 'Aprendizaje rápido / adaptabilidad', icon: 'fas fa-brain', level: undefined },
        { name: 'Autonomía', icon: 'fas fa-user-astronaut', level: undefined },
        { name: 'Trabajo bajo plazos', icon: 'fas fa-tasks', level: undefined },
        { name: 'Comunicación / claridad', icon: 'fas fa-comments', level: undefined },
      ]
    }
  ];
}