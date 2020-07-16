# -*- coding: utf-8 -*-
import selenium
import requests
import time
import os
import warnings
import pymongo

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import WebDriverException

warnings.filterwarnings("ignore")

class BbmnetSpider():
	def __init__(self):
		conexao_mongo = pymongo.MongoClient('STRING_CONEXAO_MONGODB') 
		self.mydb = conexao_mongo['licitacoes']

		url = 'https://www2.bbmnet.com.br/BBMNET/licitacao/ListarEditalPublicado.aspx'

		chrome_options = Options()
		chrome_options.add_argument('--headless')
		chrome_options.add_argument("--no-sandbox")

		self.driver = webdriver.Chrome('./chromeself.driver',chrome_options=chrome_options)
		# self.driver = webdriver.Chrome(chrome_options=chrome_options)
		
		while True:
			try:
				self.driver.get(url)
				time.sleep(2)
				btnOptions = WebDriverWait(self.driver,10).until(EC.presence_of_element_located((By.XPATH,'/html/body/div[3]/form/div[5]/div[1]/ul/li[2]/a')))
				self.driver.execute_script('arguments[0].click();', btnOptions)
				time.sleep(2)
				WebDriverWait(self.driver,10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="ctl00_cphConteudo_txtPeriodoInicial"]'))).send_keys("01012020")
				time.sleep(0.5)
				WebDriverWait(self.driver,10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="ctl00_cphConteudo_txtPeriodoFinal"]'))).send_keys("31122020")
				time.sleep(0.5)
				btnPesquisar = WebDriverWait(self.driver,10).until(EC.presence_of_element_located((By.XPATH,'//*[@id="ctl00_cphConteudo_imgButtonPesquisarPaginacao"]')))
				self.driver.execute_script('arguments[0].click();', btnPesquisar)

				pagina_main = 1
				boolWhileOut = True
				arrayBtnsNextPageOut = []
				while boolWhileOut == True:
					print ("TOTAL DE PAGINAS CRAWLEADAS ({})".format(pagina_main))
					time.sleep(3)
					if pagina_main > 156:
						soup = BeautifulSoup(self.driver.page_source, 'html.parser')
						for tableLicitacao in soup.find_all('tr',{'class' : ['gridview-row','gridview-row-alternating']}):
							soupInternoTable = BeautifulSoup(str(tableLicitacao), 'html.parser')
							id_licitacao = soupInternoTable.select_one('input')['itemchave']
							
							url_licitacao = 'https://www2.bbmnet.com.br/BBMNET/Licitacao/DetalharEdital.aspx?chaveEdital={}'.format(id_licitacao)
							print (url_licitacao)

							self.dictLicitacao = {
								'NumeroEdital' : None,
								'UnidadeCompradora' : None,
								'CidadeLicitacao' : None,
								'UFLicitacao' : None,
								'Objeto' : None,
								'LocalDisputa' : None,
								'Pregoeiro' : None,
								'DataInicioProposta' : None,
								'DataFinalProposta' : None,
								'DataInicioLances' : None,
								'Modalidade' : None,
								'FormaDeCotacao' : None,
								'ValidadeProposta' : None,
								'ValorOfertadoPor' : None,
								'PrazoParaManifestacao' : None,
								'UrlLicitacao' : None,
								'CategoriaLicitacao' : None,
								'PorcentagemCategoria' : None,
								'LotesLicitacao' : [],
								'AllLotesCrawled' : False
							}

							self.dictLicitacao['UrlLicitacao'] = str(url_licitacao)

							buscaMongo = self.mydb.licitacoes_bbmnet.find_one({
								'UrlLicitacao' : self.dictLicitacao['UrlLicitacao'],
							})
							
							if buscaMongo == None or buscaMongo['AllLotesCrawled'] == False:
								
								self.driver.execute_script("window.open()")
								time.sleep(1)

								self.driver.switch_to.window(self.driver.window_handles[1])
								self.driver.get(url_licitacao)

								time.sleep(2)
								soupLicitacao = BeautifulSoup(self.driver.page_source, 'html.parser')

								if buscaMongo == None:
									NumeroEdital = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblNumeroEdital")
									if NumeroEdital != None:
										self.dictLicitacao['NumeroEdital'] = str(NumeroEdital.text).replace('\n','').strip()

									UnidadeCompradora = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblNomeOrgaoPromotor")
									if UnidadeCompradora != None:
										self.dictLicitacao['UnidadeCompradora'] = str(UnidadeCompradora.text).replace('\n','').strip()	
										if 'Prefeitura Municipal' in str(self.dictLicitacao['UnidadeCompradora']):
											unidadeQuebra = str(self.dictLicitacao['UnidadeCompradora']).split('Prefeitura Municipal de ')
											try:
												self.dictLicitacao['UFLicitacao'] = str(unidadeQuebra[1].split('/')[1])
											except:
												pass
											try:
												self.dictLicitacao['CidadeLicitacao'] = str(unidadeQuebra[1].split('/')[0])
											except:
												pass

									Objeto = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblObjeto")
									if Objeto != None:
										self.dictLicitacao['Objeto'] = str(Objeto.text).replace('\n','').strip()
									
									LocalDisputa = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblLinkSite")
									if LocalDisputa != None:
										self.dictLicitacao['LocalDisputa'] = str(LocalDisputa.text).replace('\n','').strip()

									Pregoeiro = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblPregoeiro")
									if Pregoeiro != None:
										self.dictLicitacao['Pregoeiro'] = str(Pregoeiro.text).replace('\n','').strip()

									DataInicioProposta = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblInicioRecebimentoProposta")
									if DataInicioProposta != None:
										self.dictLicitacao['DataInicioProposta'] = str(DataInicioProposta.text).replace('\n','').strip()

									DataFinalProposta = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblFimRecebimentoProposta")
									if DataFinalProposta != None:
										self.dictLicitacao['DataFinalProposta'] = str(DataFinalProposta.text).replace('\n','').strip()

									DataInicioLances = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblAberturaProposta")
									if DataInicioLances != None:
										self.dictLicitacao['DataInicioLances'] = str(DataInicioLances.text).replace('\n','').strip()

									Modalidade = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblModalidade")
									if Modalidade != None:
										self.dictLicitacao['Modalidade'] = str(Modalidade.text).replace('\n','').strip()

									FormaDeCotacao = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblFormaCotacao")
									if FormaDeCotacao != None:
										self.dictLicitacao['FormaDeCotacao'] = str(FormaDeCotacao.text).replace('\n','').strip()

									ValidadeProposta = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblValidadeProposta")
									if ValidadeProposta != None:
										self.dictLicitacao['ValidadeProposta'] = str(ValidadeProposta.text).replace('\n','').strip()

									ValorOfertadoPor = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblValorOfertado")
									if ValorOfertadoPor != None:
										self.dictLicitacao['ValorOfertadoPor'] = str(ValorOfertadoPor.text).replace('\n','').strip()

									PrazoParaManifestacao = soupLicitacao.select_one("span#ctl00_MasterCPH_ctl00_lblDiasUteisManifestacaoRecurso")
									if PrazoParaManifestacao != None:
										self.dictLicitacao['PrazoParaManifestacao'] = str(PrazoParaManifestacao.text).replace('\n','').strip()

									idMongo = self.insertLicitacao(self.dictLicitacao)
								else:
									idMongo = buscaMongo["_id"]

								arrayBtnsNextPage = []
								pagina = 1
								boolWhile = True
								while boolWhile == True:
									soupLicitacao = BeautifulSoup(self.driver.page_source, 'html.parser')

									print ('Pagina',pagina)

									findAllLotes = soupLicitacao.find_all("tr", {'class' : ['gridview-row', 'gridview-row-alternating']})
									findAllButtonsLotes = self.driver.find_elements_by_xpath('//*[@id="ctl00_MasterCPH_grdLotes"]/tbody/tr/td[2]/a')

									for btnItens, allLotes in zip(findAllButtonsLotes,findAllLotes):
										self.arrayItens = []

										self.dictLotes = {
											'NumeroLote' : None,
											'NomeLote' : None,
											'QuantidadeLote' : None,
											'UnidadeLote' : None,
											'ValorReferencia' : None,
											'SituacaoLote' : None,
											'ParticipacaoLote' : None,
											'ItensLotes' : []
										}

										soupLotes = BeautifulSoup(str(allLotes),'html.parser')
										allPropriedadesLotes = soupLotes.find_all('td')

										NumeroLote = str(allPropriedadesLotes[0].text).strip()
										if NumeroLote != '':
											self.dictLotes['NumeroLote'] = NumeroLote

										buscaLote = self.mydb.licitacoes_bbmnet.find_one(
											{ "_id" : idMongo ,"LotesLicitacao" : { "$elemMatch": { "NumeroLote" : str(NumeroLote) } } }
										)

										if buscaLote == None:
											NomeLote = str(allPropriedadesLotes[1].text).replace("\xa0",' ').strip()
											if NomeLote != '':
												self.dictLotes['NomeLote'] = NomeLote
											QuantidadeLote = str(allPropriedadesLotes[2].text).replace("\xa0",' ').strip()
											if QuantidadeLote != '':
												self.dictLotes['QuantidadeLote'] = QuantidadeLote
											UnidadeLote = str(allPropriedadesLotes[3].text).replace("\xa0",' ').strip()
											if UnidadeLote != '':
												self.dictLotes['UnidadeLote'] = UnidadeLote
											ValoReferencia = str(allPropriedadesLotes[4].text).replace("\xa0",' ').strip()
											if ValoReferencia != '':
												self.dictLotes['ValorReferencia'] = ValoReferencia
											SituacaoLote = str(allPropriedadesLotes[5].text).replace("\xa0",' ').strip()
											if SituacaoLote != '':
												self.dictLotes['SituacaoLote'] = SituacaoLote
											ParticipacaoLote = str(allPropriedadesLotes[6].text).replace("\xa0",' ').strip()
											if ParticipacaoLote != '':
												self.dictLotes['ParticipacaoLote'] = ParticipacaoLote

											self.dictItens = {
												'NomeItem' : None,
												'Quantidade' : None,
												'Unidade' : None,
												'ValorReferencia' : None
											}

											self.driver.execute_script('arguments[0].click();', btnItens)
											time.sleep(3)
											self.driver.switch_to.window(self.driver.window_handles[2])

											time.sleep(3)

											soupItem = BeautifulSoup(self.driver.page_source, 'html.parser')
											findAllRows = soupItem.select("tr.gridview-row")

											for itensRows in findAllRows:
												soupPropsItens = BeautifulSoup(str(itensRows), 'html.parser')

												findAllProps = soupPropsItens.find_all('td')
												
												NomeItem = str(findAllProps[0].text).replace("\xa0",' ').strip()
												if NomeItem != '':
													self.dictItens['NomeItem'] = NomeItem
												Quantidade = str(findAllProps[1].text).replace("\xa0",' ').strip()
												if Quantidade != '':
													self.dictItens['Quantidade'] = Quantidade
												Unidade = str(findAllProps[2].text).replace("\xa0",' ').strip()
												if Unidade != '':
													self.dictItens['Unidade'] = Unidade   
												ValorReferencia = str(findAllProps[3].text).replace("\xa0",' ').strip()
												if ValorReferencia != '':
													self.dictItens['ValorReferencia'] = ValorReferencia

												self.arrayItens.append(self.dictItens.copy())

											self.driver.close()
											self.driver.switch_to.window(self.driver.window_handles[1])

											self.dictLotes['ItensLotes'] = self.arrayItens

											self.insertLotes(self.dictLotes, idMongo)

									clickTheBtn = False
									findAllNextsPage = self.driver.find_elements_by_xpath('//div[@class="gridview-pager"]/a')
									if len(findAllNextsPage) != 0:
										for allBtnNextPage in findAllNextsPage:
											if str(allBtnNextPage.text) != 'Primeira' and str(allBtnNextPage.text) != 'Ultima' and int(allBtnNextPage.text) not in arrayBtnsNextPage and int(allBtnNextPage.text) > 1:
												clickTheBtn = True
												arrayBtnsNextPage.append(int(allBtnNextPage.text))
												self.driver.execute_script('arguments[0].click();', allBtnNextPage)
												pagina+=1
												break
										
										if clickTheBtn == False:
											self.updateLicitacao(idMongo)
											boolWhile = False
									else:
										self.updateLicitacao(idMongo)
										boolWhile = False

								time.sleep(0.5)
								self.driver.close()
								self.driver.switch_to.window(self.driver.window_handles[0])
							else:
								print ("Já Inserido!")
								self.updateLicitacao(buscaMongo["_id"])

					clickTheBtn = False
					findAllNextsPage = self.driver.find_elements_by_xpath('//div[@class="gridview-pager"]/a')
					if len(findAllNextsPage) != 0:
						for allBtnNextPage in findAllNextsPage:
							if str(allBtnNextPage.text) != 'Primeira' and str(allBtnNextPage.text) != 'Ultima' and int(allBtnNextPage.text) not in arrayBtnsNextPageOut and int(allBtnNextPage.text) > 1:
								clickTheBtn = True
								arrayBtnsNextPageOut.append(int(allBtnNextPage.text))
								self.driver.execute_script('arguments[0].click();', allBtnNextPage)
								pagina_main+=1
								break

						if clickTheBtn == False:
							boolWhileOut = False
					else:
						boolWhileOut = False

				self.driver.quit()
			except:
				self.driver.quit()

	def updateLicitacao(self, idMongo):
		print ("ATUALIZANDO LICITAÇÃO")
		self.mydb.licitacoes_bbmnet.update_one({
			"_id" : idMongo
		},{
			"$set" : {
				"AllLotesCrawled" : True
			}
		})

	def insertLotes(self, dictLotes,idMongo):
		print ("INSERINDO NOVO LOTE ( {} )".format(
			dictLotes['NumeroLote']
		))
		self.mydb.licitacoes_bbmnet.update_one(
			{ "_id": idMongo },
			{ "$addToSet": { "LotesLicitacao": dictLotes } }
		)

	def insertLicitacao(self, dictLicitacao):
		print ("INSERINDO LICITACAO")
		if '_id' in dictLicitacao: del dictLicitacao['_id']
		idMongo = self.mydb.licitacoes_bbmnet.insert_one(dictLicitacao)
		print (idMongo.inserted_id)
		return idMongo.inserted_id

BbmnetSpider()