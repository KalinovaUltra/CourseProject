import ApiService from './framework/view/api-service.js';

export default class DocumentsApiService extends ApiService {

  async getDocuments() {
    const response = await this._load({ url: 'documents' });
    return ApiService.parseResponse(response);
  }

  async sendDocument(document) {
    const response = await this._load({
      url: 'documents',
      method: 'POST',
      body: JSON.stringify(document),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return ApiService.parseResponse(response);
  }
}