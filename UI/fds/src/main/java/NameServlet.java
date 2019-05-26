import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class NameServlet extends HttpServlet {
    @Override
    public void doGet (HttpServletRequest request, HttpServletResponse response) throws IOException {
        String str = request.getParameter("name");
        if(str.length() > 100) {
            response.getOutputStream().println("to many characters");
        }
        response.getOutputStream().println(str);
    }
}
