import pymongo
import csv
import os
import datetime
from unidecode import unidecode
from bson import ObjectId
import config
from metodos_abstratos import MetodosAbstratos

class GenerateDataset(MetodosAbstratos):
	def __init__(self):
		self.mydb, self.colecao = self.connectToMongo()

		arrayLicitacoes = self.getLicitacoesDataset()

		self.countWordsLicitacoes(arrayLicitacoes, config.DICIONARIO_PALAVRAS)

	def getLicitacoesDataset(self):
		allLicitacoes = []

		for licitacoes_definidas in config.LICITACOES_DATASET:
			licitacoesFind = self.mydb[self.colecao].find_one({
				'_id' : ObjectId(str(licitacoes_definidas['_id']))
			})
			if licitacoesFind != None:
				allLicitacoes.append({
					'licitacao' : licitacoesFind,
					'classe' : licitacoes_definidas['classe']
				}.copy())

		return allLicitacoes

	def countWordsLicitacoes(self, arrayLicitacoes, arrayPalavras):
		for licitacoes_data in arrayLicitacoes:
			dictLicitacao = self.analyzeWordsLicitacao(licitacoes_data['licitacao'], arrayPalavras)

			self.insertOrCreateCSV(dictLicitacao, arrayPalavras, licitacoes_data['classe'])

			classe = licitacoes_data['classe']
			if classe == 0:
				categoria = 'Outros'
			else:
				categoria = 'Agronegocio'

			print ('-> Categoria predita : {}'.format(categoria))

			self.mydb[self.colecao].update_one({
				'_id' : ObjectId(dictLicitacao['id_licitacao'])
			}, {
				'$set' : {
					'CategoriaLicitacao' : categoria,
					'PorcentagemCategoria' : 100,
					'ClassificacaoManual' : True
				}
			})
			print ()

	def insertOrCreateCSV(self, dictLicitacao, arrayPalavras, classe_licitacao):
		nome_dataset = config.DATASET_CONFIG['diretorio_dataset']

		if os.path.isfile(nome_dataset) == True:
			os.remove(nome_dataset)

		menuCsv = 'id_licitacao,objeto_licitacao,' + ','.join(arrayPalavras) + ',categoria\n'

		newFile = open('./{}'.format(nome_dataset), '+a', encoding='utf-8')
		newFile.write(menuCsv)
		newFile.close()
		
		arrayCaracteristicas = []
		arrayTags = arrayPalavras
		arrayTags.insert(0, 'id_licitacao')
		arrayTags.insert(1, 'objeto_licitacao')
		for tag in arrayTags:
			encontrado = 0
			if tag == 'id_licitacao':
				encontrado = 1
				arrayCaracteristicas.append(str(dictLicitacao['id_licitacao']))
			elif tag == 'objeto_licitacao':
				encontrado = 1
				arrayCaracteristicas.append(str(dictLicitacao['objeto_licitacao']).replace(',','.'))
			else:
				for palavras in dictLicitacao['existenciaPalavras']:
					palavraDict = palavras['palavra']
					if str(palavraDict) == str(tag):
						encontrado = 1
						palavraCount = palavras['existencia']
						arrayCaracteristicas.append(str(palavraCount))
		
			if encontrado == 0:
				arrayCaracteristicas.append(str(0))

		arrayCaracteristicas.append(str(classe_licitacao))

		rowCaracteristicas = ','.join(arrayCaracteristicas) + '\n'
		openFile = open('./{}'.format(nome_dataset), '+a', encoding='utf-8')
		openFile.write(rowCaracteristicas)
		openFile.close()

GenerateDataset()