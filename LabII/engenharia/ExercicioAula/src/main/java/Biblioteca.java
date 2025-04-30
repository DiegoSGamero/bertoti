import java.util.List;
import java.util.LinkedList;

public class Biblioteca {
    private List<Aluno> alunos = new LinkedList<Aluno>();

    public void adicionarAluno(Aluno aluno) {
        alunos.add(aluno);
    }

    public List<Aluno> getAlunos() {
        return alunos;
    }
}