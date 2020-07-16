import pymongo
import pickle
import config
from metodos_abstratos import MetodosAbstratos
from bson import ObjectId
from unidecode import unidecode

class ClassificadorByWords(MetodosAbstratos):
	def __init__(self):
		self.mydb, self.colecao = self.connectToMongo()
		
		self.classificador = pickle.load(open(config.MODELO_CONFIG['nome_arquivo'], 'rb'))

		arrayLicitacoes = self.getLicitacoes()

		self.countWordsLicitacoes(arrayLicitacoes, config.DICIONARIO_PALAVRAS)

	def getLicitacoes(self):
		allLicitacoes = []

		licitacoesFind = self.mydb[self.colecao].find({'CategoriaLicitacao' :  None, 'ClassificacaoManual' : False}, no_cursor_timeout=True)
		for licitacoes in licitacoesFind:
			allLicitacoes.append(licitacoes)

		return allLicitacoes

	def countWordsLicitacoes(self, arrayLicitacoes, arrayPalavras):
		for licitacoes in arrayLicitacoes:	
			dictLicitacao = self.analyzeWordsLicitacao(licitacoes, arrayPalavras)

			self.predictByMongo(dictLicitacao, arrayPalavras)
			print ()

	def predictByMongo(self, dictLicitacao, arrayPalavras):
			arrayCaracteristicas = []

			for tag in arrayPalavras:
				for palavras in dictLicitacao['existenciaPalavras']:
					palavraDict = palavras['palavra']
					if str(palavraDict) == str(tag):
						encontrado = 1
						palavraCount = palavras['existencia']
						arrayCaracteristicas.append(int(palavraCount))
				if encontrado == 0:
					arrayCaracteristicas.append(str(0))
			
			classe = int(self.classificador.predict([arrayCaracteristicas])[0])
			if classe == 0:
				categoria = 'Outros'
			else:
				categoria = 'Agronegocio'

			proba = int(float(self.classificador.predict_proba([arrayCaracteristicas])[0][classe])*100)

			print ('-> Categoria predita : {}\n--> Probabilidade : {}%'.format(categoria, proba))

			self.mydb[self.colecao].update_one({
				'_id' : ObjectId(dictLicitacao['id_licitacao'])
			}, {
				'$set' : {
					'CategoriaLicitacao' : categoria,
					'PorcentagemCategoria' : proba
				}
			})

ClassificadorByWords()