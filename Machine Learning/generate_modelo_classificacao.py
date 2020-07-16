import os
import pandas as pd
import pickle
import config

# Machine Learning
from sklearn.linear_model import LogisticRegression
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split

# Métricas para o modelo de Machine Learning
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import f1_score
from sklearn.metrics import roc_curve, auc
import sklearn.metrics as metrics
import matplotlib.pyplot as plt

class GerarModeloClassificacao():
	def __init__(self):
		self.classificarLicitacoesTrain()

	def classificarLicitacoesTrain(self):
		dataset = pd.read_csv(config.DATASET_CONFIG['diretorio_dataset'], sep=config.DATASET_CONFIG['caracter_separador'], encoding='utf-8')

		X_train, X_test, y_train, y_test = (train_test_split(dataset[config.DICIONARIO_PALAVRAS],
															dataset['categoria']))

		if str(config.MODELO_CONFIG['nome_arquivo']) not in os.listdir():
			array_algoritmos = [
				{
					'id' : 0,
					'nome' : 'Regressão Logistica',
					'algoritmo' : LogisticRegression(max_iter=100)
				},
				{
					'id' : 1,
					'nome' : 'Rede Neural',
					'algoritmo' : MLPClassifier(hidden_layer_sizes=(14, ),max_iter=100)
				},
			]

			for data_algoritmo in array_algoritmos:
				id_algoritmo = data_algoritmo['id']
				nome_algoritmo = data_algoritmo['nome']
				algoritmo = data_algoritmo['algoritmo']

				algoritmo.fit(X_train, y_train)

				predicted = algoritmo.predict(X_test)
				
				self.gerarMetricasModelos(nome_algoritmo, y_test, predicted)

				if id_algoritmo == 0:
					self.gerarMetricasDeAjustesModelo(nome_algoritmo, algoritmo, X_train, X_test, y_train, y_test)

					pickle.dump(algoritmo, open(config.MODELO_CONFIG['nome_arquivo'], 'wb'))

		algoritmo = pickle.load(open(config.MODELO_CONFIG['nome_arquivo'], 'rb'))

		return algoritmo

	def gerarMetricasModelos(self, nome_algoritmo, y_test, predicted):
		print ('Obtendo métricas',nome_algoritmo)

		accuracy = accuracy_score(y_test, predicted)
		print ('Acurácia: {}'.format(accuracy))

		precision = precision_score(y_test, predicted)
		print ('Precisão: {}'.format(precision))
		
		recall = recall_score(y_test, predicted, average='binary')
		print('Revocação: {}'.format(recall))

		f1_scorec = f1_score(y_test, predicted, average='binary')
		print('Medida F: {}'.format(f1_scorec))
		print ('Matriz de confusão:\n{}\n\n'.format(confusion_matrix(y_test, predicted)))

	def gerarMetricasDeAjustesModelo(self, nome_algoritmo, algoritmo, X_train, X_test, y_train, y_test):
		print ('Obtendo métricas de ajuste',nome_algoritmo)

		from sklearn.feature_selection import chi2
		
		chi2_, pval = chi2(X_train, y_train)

		chi2_dict = {}
		for palavra, chi2, pvalue in zip(config.DICIONARIO_PALAVRAS,chi2_,pval):
			chi2_dict[palavra] = {'chi2' : chi2, 'pval' : pvalue}

		coef_dict = {}
		for coef, feat in zip(algoritmo.coef_[0,:],config.DICIONARIO_PALAVRAS):
			coef_dict[feat] = coef

		print ('Coeficientes dos atributos')
		print (coef_dict)

		print()

		print ('Qui-Quadrado, Valor-P dos atributos')
		print (chi2_dict)

		probs = algoritmo.predict_proba(X_test)
		preds = probs[:,1]
		fpr, tpr, threshold = metrics.roc_curve(y_test, preds)
		roc_auc = metrics.auc(fpr, tpr)
		
		print ('Curva ROC do modelo de classificação', nome_algoritmo)

		plt.title('Curva ROC {}'.format(nome_algoritmo))
		plt.plot(fpr, tpr, 'b',color='orange', label = 'Curva ROC (area = %0.2f)' % roc_auc)
		plt.legend(loc = 'lower right')
		plt.plot([0, 1], [0, 1],'r--',color='blue')
		plt.xlim([0, 1])
		plt.ylim([0, 1])
		plt.ylabel('Taxa de verdadeiros positivos')
		plt.xlabel('Taxa de falsos positivos')
		plt.show()

GerarModeloClassificacao()