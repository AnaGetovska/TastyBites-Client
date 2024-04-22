import ICategoryModel from "../../Models/ICategoryModel";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import IInMenuModel from "../../Models/IInMenuModel";
import IIngredientModel from "../../Models/IIngredientModel";
import { IRecipeModel } from "../../Models/IRecipeModel";
import IShoppingListItem from "../../Models/IShoppingListItem";

class ApiService {
  private static instance: ApiService;
  private baseApiUrl = "http://localhost:5214/api/";
  private token: string = "";
  private constructor() {}

  public setToken(token: string) {
    this.token = token;
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }

    return ApiService.instance;
  }

  public async get(route: string): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return this.handleResponse(response);
  }

  public async post(route: string, body: any): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return this.handleResponse(response);
  }

  public async put(route: string, body: any): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "put",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return this.handleResponse(response);
  }

  public async delete(route: string): Promise<any> {
    const response = await fetch(this.baseApiUrl + route, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return this.handleResponse(response);
  }

  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await response.json();
      }

      return null;
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

  public async getAllRecipesByIngredients(
    ingredientsKeys: string[]
  ): Promise<IRecipeModel[]> {
    return await this.post("recipe/filter/by-ingredients", ingredientsKeys);
  }

  public async getAllRecipesByWildcard(
    segment: string
  ): Promise<IRecipeModel[]> {
    return await this.get(`recipe/filter/name/` + encodeURIComponent(segment));
  }

  public async getAllRecipesExtended(): Promise<IExtendedRecipeModel[]> {
    return await this.get("recipe/extended/all");
  }

  public async getRecipeExtendedByKey(
    key: string
  ): Promise<IExtendedRecipeModel[]> {
    return await this.get(`recipe/extended/${key}`);
  }

  public async getAllRecipesExtendedByKeys(
    keys: string[]
  ): Promise<IExtendedRecipeModel[]> {
    return await this.get(`recipe/extended?keys=${keys.join(",")}`);
  }

  public async getAllIngredients(): Promise<IIngredientModel[]> {
    return await this.get("ingredient/all");
  }

  public async getAllIngredientsByWildcard(
    segment: string
  ): Promise<IIngredientModel[]> {
    return await this.get(
      `ingredient/filter/name/` + encodeURIComponent(segment)
    );
  }
  public async getAllIngredientsByKeys(
    keys: string[]
  ): Promise<IIngredientModel[]> {
    return await this.post("ingredient/filter/", keys);
  }

  public async getWeeklyMenu(): Promise<IInMenuModel[]> {
    return await this.get("user/menu");
  }

  public async setWeeklyMenu(
    days: number[],
    recipeKey: string
  ): Promise<IInMenuModel[]> {
    return await this.post(`user/menu/${recipeKey}`, days);
  }

  public async addToShoppingList(item: IShoppingListItem) {
    return await this.post("user/shopping-list", item);
  }

  public async getShoppingList(): Promise<IShoppingListItem[]> {
    return await this.get("user/shopping-list");
  }

  public async deleteFromShoppingList(index: number) {
    return await this.delete("user/shopping-list/" + index);
  }

  public async deleteFromFavourites(key: string) {
    return await this.delete("user/favourites/" + key);
  }

  public async addToFavourites(key: string) {
    return await this.post("user/favourites/", key);
  }

  public async getFavourites(): Promise<IExtendedRecipeModel[]> {
    return await this.get("user/favourites");
  }
}

export default ApiService.getInstance();
