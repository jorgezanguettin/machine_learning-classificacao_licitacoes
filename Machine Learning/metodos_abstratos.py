import nltk
import pymongo
import re
import config
from unidecode import unidecode
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
# nltk.download('stopwords')
# nltk.download('punkt')

class MetodosAbstratos():
	def getDictLicitacoes(self, arrayPalavras):
		dictLicitacao = {
			'id_licitacao' : None,
			'objeto_licitacao' : None,
			'existenciaPalavras' : []
		}

		for palavras in arrayPalavras:
			dictPalavra = {
				'palavra' : palavras,
				'existencia' : 0
			}

			dictLicitacao['existenciaPalavras'].append(dictPalavra.copy())
		
		return dictLicitacao

	def analyzeWordsLicitacao(self, licitacao, arrayPalavras):
		arrayPropriedades = []

		id_licitacao = str(licitacao['_id'])
		print ('> Iniciando classificação', id_licitacao)
		dictLicitacao = self.getDictLicitacoes(arrayPalavras)

		dictLicitacao['id_licitacao'] = id_licitacao
		objetoLicitacao = licitacao['Objeto']
		dictLicitacao['objeto_licitacao'] = objetoLicitacao
		arrayPropriedades.append(objetoLicitacao)

		for lotes in licitacao['LotesLicitacao']:
			nomeLote = lotes['NomeLote']
			if nomeLote not in arrayPropriedades:
				arrayPropriedades.append(nomeLote)
			
			for itens in lotes['ItensLotes']:
				nomeItem = itens['NomeItem']
				if nomeItem not in arrayPropriedades:
					arrayPropriedades.append(nomeItem)

		quantidade = len(arrayPropriedades)
		print ('-> Encontrado {} palavras'.format(quantidade))

		for propriedades in arrayPropriedades:
			todasPalavras = str(self.tokenizacao_de_frases(propriedades)).split()

			for palavra in todasPalavras:
				palavra = str(unidecode(palavra)).lower()
				for palavraDataset in arrayPalavras:
					palavraDataset = str(unidecode(palavraDataset)).lower()
					if str(palavra).find(palavraDataset) != -1:
						for indexDict,palavrasDict in enumerate(dictLicitacao['existenciaPalavras']):
							palavraInDict = str(unidecode(palavrasDict['palavra'])).lower()
							if str(palavraDataset) == str(palavraInDict):
								dictLicitacao['existenciaPalavras'][indexDict]['existencia'] = 1
		
		return dictLicitacao

	def tokenizacao_de_frases(self, frase):
		frase = str(frase).replace('R$','').replace('r$','').strip()
		frase = re.sub(r"\b[A-Z\.]{2,}s?\b", "", frase)
		frase = str(frase).lower()

		stop_words = set(stopwords.words('portuguese')) 
  
		word_tokens = word_tokenize(frase)

		filtrar_pontuacao = [] 

		sentenca_completa = ''
		for w in word_tokens: 
			if w not in stop_words: 
				filtrar_pontuacao.append(w)

		new_words = [word for word in filtrar_pontuacao if word != 'ç' and word.isalnum() and not word.isdigit()]

		sentenca_completa = ' '.join(new_words)

		return sentenca_completa

	def connectToMongo(self):
		conexao_mongo = pymongo.MongoClient(config.MONGODB_CONFIG['server']) 
		mydb = conexao_mongo[config.MONGODB_CONFIG['nome_db']]
		colecao = config.MONGODB_CONFIG['nome_colecao']

		return mydb, colecao