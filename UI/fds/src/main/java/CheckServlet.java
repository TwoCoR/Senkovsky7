import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CheckServlet extends HttpServlet {
    private String masage = "{\"success\": true}";

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        response.getOutputStream().println(masage);
    }
}