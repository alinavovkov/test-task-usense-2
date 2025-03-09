import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewsCardComponent } from './components/dialog-news-card/dialog-news-card.component';
import { NewsService } from './services/news.service';

interface NewsArticle {
  title: string;
  author: string;
  publishedAt: Date;
  content: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  filteredNewsArticles: NewsArticle[] = [];
  searchValue: string = '';

  selectedCategory: string = 'All';
  authors: string[] = [];
  selectedAuthor: string = 'All';
  sortOptions = [
    { value: 'publishedAt', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];
  selectedSort: string = 'publishedAt';

  constructor(
    private dialog: MatDialog,
    private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  title = 'news-of-the-world';

  fetchNews(): void {
    this.newsService.getNews().subscribe((response) => {
      this.newsArticles = response.articles.map((article: NewsArticle) => ({
        ...article,
        publishedAt: new Date(article.publishedAt)
      }));

      this.filteredNewsArticles = [...this.newsArticles];

      this.authors = ['All', ...new Set(this.newsArticles.map(article => article.author).filter(Boolean))];

      this.sortArticles();
    });
  }

  filterNews(): void {
    let searchTerm = this.searchValue.toLowerCase().trim();

    this.filteredNewsArticles = this.newsArticles.filter(article => {
      let matchesSearch = article.title.toLowerCase().includes(searchTerm) ||
        (article.author && article.author.toLowerCase().includes(searchTerm));

      let matchesAuthor = this.selectedAuthor === 'All' || article.author === this.selectedAuthor;

      return matchesSearch && matchesAuthor;
    });
    this.sortArticles();
  }

  sortArticles(): void {
    this.filteredNewsArticles.sort((a: NewsArticle, b: NewsArticle) => {
      return this.selectedSort === 'publishedAt'
        ? b.publishedAt.getTime() - a.publishedAt.getTime()
        : a.publishedAt.getTime() - b.publishedAt.getTime();
    });
  }

  onSortChange(): void {
    this.sortArticles();
  }

  openDialog(article: NewsArticle): void {
    this.dialog.open(DialogNewsCardComponent, {
      data: article
    });
  }
}
