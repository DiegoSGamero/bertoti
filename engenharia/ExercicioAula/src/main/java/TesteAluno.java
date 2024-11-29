import org.junit.jupiter.api.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

public class TesteAluno {
    @Test
    void test() {
        Biblioteca biblioteca = new Biblioteca();
        Aluno joao = new Aluno("Joao", 12);
        biblioteca.adicionarAluno(joao);
        assertEquals(biblioteca.getAlunos().size(), 1);
    }
}
