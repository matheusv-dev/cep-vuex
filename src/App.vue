<template>
  <div class="p-5 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Busque pelo CEP</h1>

    <!-- Input com máscara para CEP -->
    <div class="flex items-center space-x-4">
      <input
        v-model="query"
        @input="formatCep"
        type="text"
        placeholder="Digite o CEP"
        class="border border-gray-300 rounded py-2 px-4 w-full max-w-xs"
        maxlength="10"
      />
      <button
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        @click="fetchApiData"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Carregando...' : 'Buscar Dados' }}
      </button>
      <button
        class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        @click="clearData"
      >
        Limpar
      </button>
    </div>
    <p v-if="isLoading" class="text-gray-600 mt-4">Carregando...</p>
    <p v-if="error" class="text-red-500 mt-4">Erro: {{ error }}</p>
    <div v-if="data && !error" class="mt-4">
      <h2 class="text-2xl font-semibold">Dados da API:</h2>
      <!-- Tabela com os dados da API -->
      <table class="border min-w-full border-collapse mt-4">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2 text-left">Campo</th>
            <th class="px-4 py-2 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Rua</td>
            <td class="px-4 py-2 border">{{ data.logradouro }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Bairro</td>
            <td class="px-4 py-2 border">{{ data.bairro }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Complemento</td>
            <td class="px-4 py-2 border">{{ data.complemento }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Cidade</td>
            <td class="px-4 py-2 border">{{ data.localidade }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Estado</td>
            <td class="px-4 py-2 border">{{ data.uf }}/{{ data.estado }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Região</td>
            <td class="px-4 py-2 border">{{ data.regiao }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">DDD</td>
            <td class="px-4 py-2 border">{{ data.ddd }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">GIA</td>
            <td class="px-4 py-2 border">{{ data.gia }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">IBGE</td>
            <td class="px-4 py-2 border">{{ data.ibge }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">SIAFI</td>
            <td class="px-4 py-2 border">{{ data.siafi }}</td>
          </tr>
          <tr class="bg-white odd:bg-gray-100">
            <td class="px-4 py-2 border">Unidade</td>
            <td class="px-4 py-2 border">{{ data.unidade }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default { 
  data() {
    return {
      query: '',
      data: null,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    formatCep() {
      this.query = this.query.replace(/\D/g, '');
      if (this.query.length > 5) {
        this.query = this.query.slice(0, 5) + '-' + this.query.slice(5, 8);
      } else if (this.query.length > 3) {
        this.query = this.query.slice(0, 3) + '-' + this.query.slice(3, 5);
      }
    },
    async fetchApiData() {
      if (!this.query) return;
      this.isLoading = true;
      this.error = null;

      try {
        const response = await fetch(`https://viacep.com.br/ws/${this.query.replace(/-/g, '')}/json/`);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        const result = await response.json();
        if (result.erro) {
          throw new Error('CEP não encontrado');
        }
        this.data = result;
      } catch (err) {
        this.error = err.message;
        this.data = null;
      } finally {
        this.isLoading = false;
      }
    },
    clearData() {
      this.query = '';
      this.data = null;
      this.isLoading = false;
      this.error = null;
    },
  },
};
</script>