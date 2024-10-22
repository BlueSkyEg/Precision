import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, NgIf } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, TabMenuModule, ButtonModule,NgIf],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  items!: MenuItem[] | undefined;

  activeItem!: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-home' },
      { label: 'Transactions', icon: 'pi pi-chart-line' },
      { label: 'Products', icon: 'pi pi-list' },
    ];

    this.activeItem =this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Watches',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 42,
      inventoryStatus: 'LOWSTOCK',
      rating: 3,
    },
  ];
}
