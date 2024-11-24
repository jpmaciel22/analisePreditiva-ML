import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
pd.plotting.register_matplotlib_converters()
import matplotlib.pyplot as plt
import seaborn as sns

def dividir_dados(X, y):
    X_train, X_valid, y_train, y_valid = train_test_split(X, y, train_size=0.8, test_size=0.2, random_state=0)
    return X_train, X_valid, y_train, y_valid

def tratar_dados_nulos(X_train, X_valid, imputer):
    imputed_X_train = pd.DataFrame(imputer.fit_transform(X_train))
    imputed_X_valid = pd.DataFrame(imputer.transform(X_valid))
    
    imputed_X_train.columns = X_train.columns
    imputed_X_valid.columns = X_valid.columns
    
    return imputed_X_train, imputed_X_valid

def treino_e_avaliacao_modelo(X_train, X_valid, y_train, y_valid, model):
    model.fit(X_train, y_train)
    prev = model.predict(X_valid)
    erro = int(mean_absolute_error(y_valid, prev))
    return erro, prev

residuos_file_path = "prediction//dados_previsao.csv"
previsao_file_path = "prediction//dados_futuros.csv"

residuos_data = pd.read_csv(residuos_file_path, index_col="Ano")
previsao_data = pd.read_csv(previsao_file_path, index_col="Ano")

y = residuos_data["Total Aterros(Ton)"]
X = residuos_data.drop(columns=["Total Aterros(Ton)"])

X_train, X_valid, y_train, y_valid = dividir_dados(X, y)

imputer = SimpleImputer()
imputed_X_train, imputed_X_valid = tratar_dados_nulos(X_train, X_valid, imputer)

model = RandomForestRegressor(n_estimators=1000, random_state=0, max_depth=4)

erro_medio, previsões_do_modelo = treino_e_avaliacao_modelo(X_train, X_valid, y_train, y_valid, model)

print(f"Pontuação do treino: {erro_medio}")
print(f"Previsões dadas: {previsões_do_modelo}")
print(f"Valores reais: {y_valid}")

# Codigo de previsão

X_previsao = previsao_data.drop(columns=["Total Aterros(Ton)"])

imputed_X_previsao = pd.DataFrame(imputer.transform(X_previsao))
imputed_X_previsao.columns = X_previsao.columns

previsao = model.predict(imputed_X_previsao)
previsao = [int(prev) for prev in previsao]
print(f"previsao para anos futuros:{previsao}")
previsao_data["Total Aterros(Ton)"] = previsao

# divisao de dados para visualizacao

dados_reais = residuos_data["Total Aterros(Ton)"]
dados_previsoes = previsao_data["Total Aterros(Ton)"]

ultimo_real = dados_reais.iloc[-1]
primeiro_previsto = dados_previsoes.iloc[0]
index_conexao = [dados_reais.index[-1], dados_previsoes.index[0]]
valores_conexao = [ultimo_real, primeiro_previsto]

plt.figure(figsize=(7,4))
plt.title(":3")
plt.xlabel("Ano")
plt.ylabel("Quantidade de dejetos")

# index x estava dando anos com decimal, isso é so pra impedir que aconteca
plt.gca().xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: int(x)))

sns.lineplot(x=dados_reais.index, y=dados_reais.values)
sns.lineplot(x=dados_previsoes.index, y=dados_previsoes.values, linestyle='--', color='cyan')
plt.plot(index_conexao, valores_conexao, linestyle="--", color="cyan")

plt.show()