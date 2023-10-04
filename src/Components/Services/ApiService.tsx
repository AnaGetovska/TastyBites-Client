import ICategoryModel from "../../Models/ICategoryModel";
import { IRecipeModel } from "../../Models/IRecipeModel";

class ApiService {
  private static instance: ApiService;
  private baseApiUrl = "http://localhost:5214/api/";

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public async get(route: string): Promise<any> {
    const response = await fetch(this.baseApiUrl + route);
    return this.handleResponse(response);
  }

  public async post(route: string, body: any): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return this.handleResponse(response);
  }

  public async put(route: string, body: any): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return this.handleResponse(response);
  }

  public async delete(route: string): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "delete",
    });
    return this.handleResponse(response);
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return await response.json();
    }
  }

  public async getAllCategories(): Promise<ICategoryModel[]> {
    return await this.get("category/all");
  }

  public async getCategoriesByType(type: string): Promise<ICategoryModel[]> {
    return await this.get(`category/${type}/all`);
  }

  public async getCategoryByKey(key: string): Promise<ICategoryModel[]> {
    return await this.get(`category/${key}`);
  }

  public async getAllRecipes(): Promise<IRecipeModel[]> {
    return await this.get("recipe/all");
  }

  public async getAllRecipesExtended(): Promise<IRecipeModel[]> {
    return await this.get("recipe/extended/all");
  }
}

export default ApiService.getInstance();
