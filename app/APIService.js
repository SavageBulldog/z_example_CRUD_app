export class APIService {
    #url;

    constructor(url) {
        this.#url = url;
    }

    async GET(resource) {
        try {
            const response = await fetch(`${this.#url}/${resource}`);
            if (!response.ok) throw new Error('GET not successful!');
            
            const data = await response.json();
            return data;

        } catch (error) {
            throw error;
        }
    }

    async getById(resource, id) {
        try {
            const response = await fetch(`${this.#url}/${resource}/${id}`);
            if (!response.ok) throw new Error('GET not successful!');
            
            const data = await response.json();
            return data;

        } catch (error) {
            throw error;
        }
    }

    async POST(obj, resource) {
        resource = resource || 'posts';
        const response = await fetch(`${this.#url}/${resource}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        const data = response.json();
        return data;
    }

    async PUT(obj, id, resource) {
        const response = await fetch(`${this.#url}/${resource}/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) throw new Error("Update not successful!");
    }

    async DELETE(id, resource) {
        resource = resource || 'posts';
        const response = await fetch(`${this.#url}/${resource}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Delete not successful!");
    }
}