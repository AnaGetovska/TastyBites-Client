import { CategoryType } from "../../Models/CategoryType";
import ICategoryModel from "../../Models/ICategoryModel";
import ApiService from "./ApiService";
import * as _ from "lodash";

class CategoryService {
  private static instance: CategoryService;

  private apiService = ApiService;
  private categories: ICategoryModel[] = [];
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService();
    }

    return CategoryService.instance;
  }

  public async load(): Promise<ICategoryModel[]> {
    const request = ApiService.getAllCategories();
    request.then((categories) => {
      this.categories = categories;
      this.isLoaded = true;
    });
    return request;
  }

  public async getAll(): Promise<ICategoryModel[]> {
    if (!this.isLoaded) {
      return this.load();
    }
    return new Promise<ICategoryModel[]>((resolve, reject) => {
      resolve(this.categories);
    });
  }

  public async getByKey(key: string): Promise<ICategoryModel> {
    if (!this.isLoaded) {
      await this.load();
    }
    const category = _.find(this.categories, { _key: key });
    const promise = new Promise<ICategoryModel>((resolve, reject) => {
      if (category) {
        resolve(category);
      } else {
        reject();
      }
    });
    return promise;
  }

  public async getByType(type: CategoryType): Promise<ICategoryModel[]> {
    if (!this.isLoaded) {
      await this.load();
    }
    const category = _.filter(this.categories, { type: type });
    const promise = new Promise<ICategoryModel[]>((resolve, reject) => {
      if (category) {
        resolve(category);
      } else {
        reject();
      }
    });
    return promise;
  }
}

export default CategoryService.getInstance();
