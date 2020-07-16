# Utilização de algoritmos de Machine Learning para classificação de licitações do agronegócio

## Objetivo
O processo licitatório no Brasil tem diversas modalidades, dentre elas, o pregão eletrônico, onde existe uma grande variedade de plataformas cada uma com sua singularidade. Neste trabalho foi apresentado a utilização dos algoritmos de Regressão Logística (RL) e Rede Neural Artificial (RN) para a classificação das licitações presentes na plataforma BBMNET entre pertencentes ao agronegócio e não pertencentes ao agronegócio. Dando suporte aos algoritmos classificatórios, foi criado um dicionário de palavras e sua existência foi verificada nas licitações coletados por meio de um Web Crawler. Os resultados mostram que os algoritmos de RL e RN obtiveram uma acurácia de 84% e 72% respectivamente. O algoritmo de RN obteve maior dificuldade em classificar as licitações corretamente. O modelo escolhido foi capaz de classificar as licitações entre pertencentes ou não ao agronegócio.

## Avisos

Antes de qualquer execução, instale os frameworks e bibliotecas apresentados no artigo deste mesmo trabalho.

## Instruções

1. Acesse o arquivo /Machine Learning/config.py e altere as configurações segundo sua preferencia.

2. Para a geração do dataset de teste/treino, utilize o arquivo /Machine Learning/generate_dataset_words.py

3. Para a geração do modelo de clasificação, utilize o arquivo /Machine Learning/generate_modelo_classificao.py

4. Para realizar a classificação das licitações entre agronegocio e não-agronegocio, utilize o arquivo /Machine Learning/classificador_licitacoes.py

5. Para utilizar a API, execute na raiz da pasta Plataforma Mobile/API o comando "node server.js"

6. Para utilizar a Plataforma Mobile, execute na raiz da pasta Plataforma Mobile/AgroLicitacoes o comando "ionic serve"

## Observações

Para os demais recursos, lembre-se de alterar as strings de conexão com o MongoDB no arquivos a serem utilizados.